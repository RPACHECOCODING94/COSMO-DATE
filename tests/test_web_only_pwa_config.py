import json
from pathlib import Path


def test_expo_app_has_web_and_native_identifiers():
    app_json = Path("frontend/app.json")
    data = json.loads(app_json.read_text(encoding="utf-8"))
    expo = data.get("expo", {})

    assert "web" in expo
    assert expo["web"].get("display") == "standalone"

    ios = expo.get("ios", {})
    android = expo.get("android", {})

    assert ios.get("bundleIdentifier") == "com.cosmodate.app"
    assert android.get("package") == "com.cosmodate.app"


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


def test_root_eas_json_exists_for_eas_cli():
    eas_json = Path("eas.json")
    assert eas_json.exists()

    data = json.loads(eas_json.read_text(encoding="utf-8"))
    assert "build" in data
    assert "preview" in data["build"]


def test_root_package_json_exists_for_expo_cli():
    package_json = Path("package.json")
    assert package_json.exists()

    data = json.loads(package_json.read_text(encoding="utf-8"))
    assert data.get("private") is True
    scripts = data.get("scripts", {})
    assert "start" in scripts
    assert "web" in scripts
