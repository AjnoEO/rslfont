import json
from pathlib import Path

DIR = Path(__file__).parent

FILENAME = input("Choose filename (default 'train_to_china'): ") or "train_to_china"
SOURCE = DIR / (FILENAME + ".vtt")
TARGET = DIR / (FILENAME + ".json")

def timecode_to_float(s: str):
    units = s.split(":")
    res = 0.0
    for u in units:
        res *= 60
        res += float(u)
    return res

def get_timecodes(s: str):
    i = s.find("-->")
    return timecode_to_float(s[:i-1]), timecode_to_float(s[i+4:])

tokens: list[dict[str, str | float]] = []

with open(SOURCE, encoding="utf8") as f:
    assert f.readline() == "WEBVTT\n"
    f.readline()
    token = None
    for line in f:
        line = line.strip()
        if not line:
            if token: tokens.append(token)
            token = {"text": " "}
        elif "-->" in line:
            if token: tokens.append(token)
            s, e = get_timecodes(line)
            token = {"start": s, "end": e}
        else:
            if "text" in token:
                tokens.append(token)
                token = {}
            token["text"] = line.replace(" ", "\xA0").replace("", "\u2060")[1:-1]
            if "start" not in token and len(tokens) > 0 and tokens[-1]["text"].isspace(): tokens[-1]["text"] = "\xA0"
    tokens.append(token)

with open(TARGET, mode="w", encoding="utf8") as f:
    json.dump(tokens, f, indent=4, ensure_ascii=False)