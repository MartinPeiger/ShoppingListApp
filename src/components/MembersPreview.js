export default function MembersPreview({ members, ownerId, currentUserId, onAddMember, onRemoveMember, onLeaveList }) {
  const isOwner = currentUserId === ownerId;

  return (
    <div className="members-preview">
      <h3>Členové:</h3>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name}
            {isOwner && member.id !== ownerId && (
              <button onClick={() => onRemoveMember(member.id)}>Odstranit</button>
            )}
            {!isOwner && member.id === currentUserId && (
              <button onClick={() => onLeaveList(member.id)}>Odejít</button>
            )}
          </li>
        ))}
      </ul>
      {isOwner && (
        <div>
          <input id="newMemberName" placeholder="Jméno nového člena" />
          <button onClick={() => {
            const input = document.getElementById("newMemberName");
            onAddMember(input.value);
            input.value = "";
          }}>Přidat člena</button>
        </div>
      )}
    </div>
  );
}