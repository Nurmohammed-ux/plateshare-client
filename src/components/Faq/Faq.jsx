const FAQS = [
  {
    q: "Is PlateShare free to use?",
    a: "Yes. Posting food and collecting food are both completely free — PlateShare never takes a cut.",
  },
  {
    q: "What kind of food can I share?",
    a: "Anything safe and still good to eat: home-cooked leftovers, surplus groceries, bakery items, garden produce, and sealed pantry goods.",
  },
  {
    q: "How do I arrange pickup?",
    a: "Once someone claims your listing, you can message them directly in the app to agree a time and place.",
  },
  {
    q: "Is there a limit to how much I can post?",
    a: "No limit — post as often as you have spare food. Just keep the quantity and pickup window accurate.",
  },
];

const Faq = () => {
  return (
    <div className="pb-10">
      <div className="text-center max-w-2xl lg:max-w-4xl mx-auto mb-10">
        <p className="badge badge-secondary badge-outline font-semibold mb-3">
          Good to know
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently asked questions
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((item, i) => (
          <div
            key={item.q}
            className="collapse collapse-plus bg-base-100 border border-base-200"
          >
            <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
            <div className="collapse-title font-semibold">{item.q}</div>
            <div className="collapse-content text-sm text-gray-600">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
