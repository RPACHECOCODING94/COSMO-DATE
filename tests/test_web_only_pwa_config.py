import json
from pathlib import Path


def test_expo_app_is_web_only():
    app_json = Path("frontend/app.json")
    data = json.loads(app_json.read_text(encoding="utf-8"))
    expo = data.get("expo", {})

    assert "web" in expo
    assert "ios" not in expo
    assert "android" not in expo
    assert expo["web"].get("display") == "standalone"


def test_package_scripts_default_to_web():
    package_json = Path("frontend/package.json")
    data = json.loads(package_json.read_text(encoding="utf-8"))
    scripts = data.get("scripts", {})

    assert scripts.get("start") == "expo start --web"
    assert scripts.get("web") == "expo start --web"
    assert "ios" not in scripts
    assert "android" not in scripts


def test_metro_uses_default_platform_resolution():
    metro_config = Path("frontend/metro.config.js").read_text(encoding="utf-8")

    assert "getDefaultConfig" in metro_config
    assert "Keep default sourceExts" in metro_config
    assert "webFirstSourceExts" not in metro_config
