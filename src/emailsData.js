/**
 * Generates 50 Double-Agent / High-Profile Assassin themed emails
 */

const contacts = [
  { name: "The Client", email: "encrypted-source@dark-web.io", agency: "Unknown" },
  { name: "Handler 'V'", email: "v.handler@cia.gov.internal", agency: "CIA" },
  { name: "Director Borov", email: "borov.d@fsb.ru.secure", agency: "FSB" }, // Double agent side
  { name: "Shadow Broker", email: "market@omega-net.ch", agency: "Freelance" },
  { name: "Colonel Miller", email: "miller.j@nsa.gov.top", agency: "NSA" }
];

const plotEmails = [
  {
    sender: "The Client",
    subject: "CONTRACT: Operation Red Square",
    body: "Agent, your reputation as the world's premier marksmanship expert precedes you. We have a target: The President of the Russian Federation. Event: The Victory Day Parade. Reward: $500,000,000. Confirm participation.",
    folder: "Inbox"
  },
  {
    sender: "Me (Operator 01)",
    subject: "RE: CONTRACT: Operation Red Square",
    body: "I've reviewed the schematics and the wind patterns for May 9th. The 500 million is acceptable. I require half upfront in XMR. The target will not survive the speech.",
    folder: "Sent"
  },
  {
    sender: "Director Borov",
    subject: "Russian Intelligence Update",
    body: "The Kremlin is unaware of your dual loyalty. Continue providing reports to Langley, but ensure the Moscow extraction route remains open. We have your backup ready.",
    folder: "Inbox"
  },
  {
    sender: "Handler 'V'",
    subject: "Don't get too close",
    body: "Langley suspects you might be taking private contracts again. Remember who owns you. Don't do anything that compromises the US-Russia diplomatic status unless authorized.",
    folder: "Inbox"
  },
  {
    sender: "The Client",
    subject: "Payment Received - Advance Sent",
    body: "The 250 million has been deposited into the Cayman account. Proceed to the safehouse in St. Petersburg to collect the customized .50 cal rifle.",
    folder: "Inbox"
  },
  {
    sender: "Me (Operator 01)",
    subject: "Asset Acquisition: Complete",
    body: "Rifle collected. Calibration complete. I am moving into position. Expected window: 10:15 AM Moscow time.",
    folder: "Sent"
  }
];

const generatePlotEmails = () => {
  const emails = [];
  
  // 1. Add specific plot-critical emails
  plotEmails.forEach((p, i) => {
    const documentBody = `
From: ${p.sender} <${contacts.find(c => c.name === p.sender)?.email || "me@secure.node"}>
Date: ${new Date().toLocaleString()}
Subject: ${p.subject}
Security-Level: TOP SECRET // ALPHA-SIGMA-9

----------------------------------------------------------------------

${p.body}

----------------------------------------------------------------------
This communication is property of the clandestine services. 
Unauthorized distribution is punishable by Level 4 Protocol.
`;
    emails.push({
      id: i + 1,
      sender: p.sender,
      senderEmail: contacts.find(c => c.name === p.sender)?.email || "me@secure.node",
      subject: p.subject,
      preview: p.body.substring(0, 100) + "...",
      body: documentBody,
      time: i < 3 ? "10:24 AM" : "Apr 15",
      fullDate: new Date().toLocaleString(),
      read: i > 2,
      starred: true,
      folder: p.folder,
      attachments: i === 0 ? [{ id: 'map-1', name: "red_square_blindspots.pdf", type: "pdf", size: "12 MB" }] : [],
      isSecret: true,
      isDeleted: false
    });
  });

  // 2. Add filler emails to reach 50
  const fillerCount = 50 - emails.length;
  for (let j = 0; j < fillerCount; j++) {
    const contact = contacts[Math.floor(Math.random() * contacts.length)];
    const id = emails.length + 1;
    const isSent = Math.random() > 0.7;
    
    emails.push({
      id,
      sender: isSent ? "Me (Operator 01)" : contact.name,
      senderEmail: isSent ? "me@secure.node" : contact.email,
      subject: `Standard Intelligence Report #${id}`,
      preview: "Routine data collection regarding geopolitical tensions...",
      body: "Attached is the weekly report from the field agents. Everything is operating within normal parameters.",
      time: "Yesterday",
      fullDate: new Date().toLocaleString(),
      read: Math.random() > 0.2,
      starred: Math.random() > 0.9,
      folder: isSent ? "Sent" : (Math.random() > 0.8 ? "Spam" : "Inbox"),
      attachments: [],
      isSecret: true,
      isDeleted: false
    });
  }

  return emails;
};

export const emailsData = generatePlotEmails();
