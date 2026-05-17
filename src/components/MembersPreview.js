import { useTranslation } from "../i18n";

export default function MembersPreview({
  members,
  ownerId,
  currentUserId,
  onAddMember,
  onRemoveMember,
  onLeaveList
}) {
  const { t } = useTranslation();

  const isOwner = currentUserId === ownerId;

  const safeMembers = members || [];

  return (
    <div className="members-preview">
      <h3>{t("members")}</h3>

      <ul>
        {safeMembers.map(member => (
          <li key={member.id}>
            {member.name}

            {isOwner && member.id !== ownerId && (
              <button onClick={() => onRemoveMember(member.id)}>
                {t("remove")}
              </button>
            )}

            {!isOwner && member.id === currentUserId && (
              <button onClick={() => onLeaveList(member.id)}>
                {t("leave")}
              </button>
            )}
          </li>
        ))}
      </ul>

      {isOwner && (
        <div>
          <input
            id="newMemberName"
            placeholder={t("newMemberName")}
          />

          <button
            onClick={() => {
              const input =
                document.getElementById("newMemberName");

              if (!input.value) return;

              onAddMember(input.value);
              input.value = "";
            }}
          >
            {t("addMember")}
          </button>
        </div>
      )}

    </div>
  );
}