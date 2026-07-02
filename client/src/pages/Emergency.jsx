export default function Emergency() {
  const contacts = [
    {
      title: "Police",
      number: "100",
      icon: "🚓",
    },

    {
      title: "Ambulance",
      number: "102",
      icon: "🚑",
    },

    {
      title: "Fire Brigade",
      number: "101",
      icon: "🚒",
    },

    {
      title: "Women Helpline",
      number: "1091",
      icon: "👩",
    },

    {
      title: "Tourist Helpline",
      number: "1363",
      icon: "🧳",
    },

    {
      title: "Emergency",
      number: "112",
      icon: "☎️",
    },
  ];

  return (
    <div className="container emergency-page">
      <h1 className="page-title">Emergency Assistance</h1>

      <p className="emergency-subtitle">
        Keep these important emergency contacts handy while travelling.
      </p>

      <div className="emergency-grid">
        {contacts.map((item, index) => (
          <div className="emergency-card" key={index}>
            <div className="emergency-icon">{item.icon}</div>

            <h2>{item.title}</h2>

            <h3>{item.number}</h3>

            <a href={`tel:${item.number}`} className="btn-primary">
              Call Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
