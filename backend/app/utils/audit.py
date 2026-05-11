from app.models.audit_log import AuditLog


def create_audit_log(
    db,
    user,
    action,
    resource,
    details=""
):
    try:
        log = AuditLog(
            user_id=user.id,
            user_name=user.full_name,
            role=user.role,
            action=action,
            resource=resource,
            details=details
        )

        db.add(log)
        db.commit()

    except Exception as e:
        print("AUDIT LOG ERROR:", e)