#!/usr/bin/env python3
"""Check that Basic Auth failures return no protected response data."""

import argparse
import base64
import secrets
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import HTTPRedirectHandler, Request, build_opener


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base_url")
    parser.add_argument("paths", nargs="+")
    args = parser.parse_args()
    client = build_opener(NoRedirect)
    dummy = base64.b64encode(f"release-check-{secrets.token_hex(12)}:invalid".encode()).decode()
    expected_body = b"Unauthorized"

    for path in args.paths:
        if not path.startswith("/") or path.startswith("//"):
            parser.error("each protected path must begin with a single slash")
        url = args.base_url.rstrip("/") + quote(path, safe="/%")
        for case, headers in (
            ("anonymous", {}),
            ("invalid credentials", {"Authorization": f"Basic {dummy}"}),
        ):
            try:
                response = client.open(Request(url, headers=headers), timeout=10)
            except HTTPError as error:
                response = error
            with response:
                challenge = response.headers.get("WWW-Authenticate", "")
                cache = response.headers.get("Cache-Control", "").lower()
                content_type = response.headers.get_content_type()
                body = response.read(len(expected_body) + 1)
                if (
                    response.code != 401
                    or not challenge.lower().startswith("basic ")
                    or "no-store" not in cache
                    or content_type != "text/plain"
                    or body != expected_body
                ):
                    raise SystemExit(f"Unsafe authentication response for {path} ({case}, HTTP {response.code})")
        print(f"{path}: both authentication failures returned a plain 401 without protected content")


if __name__ == "__main__":
    main()
