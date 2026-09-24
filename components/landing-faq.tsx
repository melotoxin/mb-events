const questions = [
  {
    question: "How do the deposit and booking terms work?",
    answer: "MB will confirm the deposit amount, payment schedule, and booking terms in your proposal and contract before you commit. Ask about the terms for your specific date.",
  },
  {
    question: "Can MB travel beyond Long Island and New York City?",
    answer: "Yes. MB primarily serves Long Island, New York City, and the wider Tri-State area, and can discuss events farther away. Any additional travel charges are reviewed with you before booking and stated in your contract.",
  },
  {
    question: "What happens if sound equipment fails?",
    answer: "Ask your Event Specialist to confirm the backup equipment and contingency plan for your venue and event in the proposal.",
  },
  {
    question: "Can my venue request proof of insurance?",
    answer: "MB carries liability insurance. Share your venue’s certificate requirements early so the team can confirm the documentation and any special provisions it needs.",
  },
] as const;

export function LandingFaq() {
  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="shell faq-grid">
        <div><p className="eyebrow">GOOD TO KNOW</p><h2 id="faq-heading">A few answers<br /><em>before we begin.</em></h2><p>More questions? Call <a href="tel:+18556276863">855-MBSOUND</a> and we’ll talk through your event.</p></div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
