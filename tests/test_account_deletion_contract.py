from pathlib import Path


def test_backend_exposes_delete_profile_endpoint():
    server = Path('backend/server.py').read_text(encoding='utf-8')
    assert '@api_router.delete("/users/profile")' in server
    assert 'Cuenta eliminada exitosamente' in server
    assert 'db.users.delete_one' in server
    assert 'db.date_requests.delete_many' in server


def test_account_deletion_does_not_cap_related_matches_cleanup():
    server = Path('backend/server.py').read_text(encoding='utf-8')
    assert '.to_list(1000)' not in server
    assert 'match_ids = [m["id"] async for m in related_matches_cursor]' in server


def test_profile_screen_has_delete_account_action():
    profile = Path('frontend/app/(tabs)/profile.tsx').read_text(encoding='utf-8')
    assert 'Dar de baja cuenta' in profile
    assert "await api.delete('/users/profile')" in profile
