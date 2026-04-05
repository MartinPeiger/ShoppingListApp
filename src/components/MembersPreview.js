function MembersPreview({ members }) {

  return (
    <div>

      <h3>Členové:</h3>

      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default MembersPreview;