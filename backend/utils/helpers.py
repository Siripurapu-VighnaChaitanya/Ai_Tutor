import json
import zlib
import base64

def compress_payload(data: dict) -> str:
    """Compresses a dictionary payload for low-bandwidth transfer."""
    json_data = json.dumps(data)
    compressed = zlib.compress(json_data.encode('utf-8'))
    return base64.b64encode(compressed).decode('utf-8')

def decompress_payload(compressed_str: str) -> dict:
    """Decompresses a base64 encoded compressed payload."""
    compressed_data = base64.b64decode(compressed_str)
    decompressed = zlib.decompress(compressed_data)
    return json.loads(decompressed.decode('utf-8'))
