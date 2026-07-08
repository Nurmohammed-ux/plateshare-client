const testimonials = [
  {
    name: "Sarah Oliver",
    role: "PlateShare member",
    quote:
      "I started using PlateShare because we needed items for our newborn. I've since discovered a whole community nearby doing the same for each other.",
    avatar:
      "https://i.ibb.co.com/XkK0M4BN/sarah.avif",
  },
  {
    name: "Chloe Johnson",
    role: "PlateShare member",
    quote:
      "I wanted to come and say hi — I'm new here and this app has been such a positive experience during a tight month for our family.",
    avatar:
      "https://i.ibb.co.com/XkK0M4BN/sarah.avif",
  },
  {
    name: "Imran Kabir",
    role: "Local bakery owner",
    quote:
      "Instead of tossing unsold bread at closing, we list it on PlateShare and it's collected within the hour, every time.",
    avatar:
      "https://i.ibb.co.com/4RRKJdPw/mustafiz.webp",
  },
];

const Testimonials = () => {
  return (
    <div className="pb-10 px-4">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <p className="badge badge-secondary badge-outline font-semibold mb-3">
          Community voices
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Hear why our community loves PlateShare
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="card bg-base-100 shadow-sm border border-base-200"
          >
            <div className="card-body">
              <p className="text-3xl text-primary/30 leading-none">“</p>
              <p className="text-gray-600 text-sm -mt-2">{t.quote}</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
