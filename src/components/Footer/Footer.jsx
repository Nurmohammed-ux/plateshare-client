import { useState } from "react";
import { Link } from "react-router";

import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setSubscribing(true);
      // Swap this for your real newsletter endpoint once it exists, e.g.
      // await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 500));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Subscribed! You'll hear from us soon.",
        showConfirmButton: false,
        timer: 1500,
      });
      setEmail("");
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "Failed to update food",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main footer content */}
      <div className="footer sm:footer-horizontal px-8 py-14 max-w-7xl mx-auto">
        <aside>
          <Link to="/" className="text-2xl font-bold text-neutral-content">
            Plate
            <span className="text-transparent bg-clip-text text-gradient">
              Share
            </span>
          </Link>
          <p className="opacity-70 max-w-xs text-sm mt-2">
            A community platform for sharing spare food before it goes to waste.
            Post it, find it, collect it.
          </p>

          {/* Contact info */}
          <div className="mt-5 space-y-2.5 text-sm opacity-80">
            <div className="flex items-start gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0"
              >
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>House 24, Road 12, Dhanmondi, Dhaka 1209</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2z" />
              </svg>
              <a
                href="tel:+8801234567890"
                className="hover:text-neutral-content"
              >
                +880 1234-567890
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m3 6 9 6 9-6" />
              </svg>
              <a
                href="mailto:hello@plateshare.com"
                className="hover:text-neutral-content"
              >
                hello@plateshare.com
              </a>
            </div>
          </div>
        </aside>
          <div className="lg:ml-8">
            <h6 className="footer-title">Platform</h6>
            <Link to="/availableFoods" className="link link-hover">
              Available Foods
            </Link>
            <Link to="/addFood" className="link link-hover">
              Add Food
            </Link>
            <Link to="/manageMyFoods" className="link link-hover">
              Manage My Foods
            </Link>
          </div>

          <div className="lg:ml-8">
            <h6 className="footer-title">About</h6>
            <a className="link link-hover">How it works</a>
            <a className="link link-hover">Our impact</a>
            <a className="link link-hover">FAQs</a>
          </div>

          <div className="lg:ml-8">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">Our Story</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Contact</a>
          </div>
        </div>
      {/* Newsletter band */}
      <div className="border-b border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-8 pb-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-3">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold">
              Get the latest{" "}
              <span className="text-transparent bg-clip-text text-gradient">
                food-sharing news
              </span>
            </h3>
            <p className="opacity-70 text-sm mt-1">
              New features, community stories, and nearby food alerts — no spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="join w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input input-bordered join-item w-full text-base-content"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="btn btn-secondary join-item"
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-content/10 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm opacity-70">
          <span>
            &copy; {new Date().getFullYear()} PlateShare. Waste less. Share
            more.
          </span>
          <div className="flex gap-4">
            <a aria-label="Facebook" className="hover:opacity-100">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15 3h-2a4 4 0 0 0-4 4v2H7v4h2v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a aria-label="Instagram" className="hover:opacity-100">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.901 2H21.99l-6.75 7.72L23.5 22h-6.46l-5.06-6.62L6.17 22H3.08l7.22-8.25L.5 2h6.63l4.58 6.02L18.901 2Zm-1.13 18h1.8L6.15 3.9H4.23L17.77 20Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
