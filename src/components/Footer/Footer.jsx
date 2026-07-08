import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="footer sm:footer-horizontal px-6 py-14 max-w-7xl mx-auto">
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
        </aside>

        <nav>
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
        </nav>

        <nav>
          <h6 className="footer-title">About</h6>
          <a className="link link-hover">How it works</a>
          <a className="link link-hover">Our impact</a>
          <a className="link link-hover">FAQs</a>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">Our Story</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Contact</a>
        </nav>
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
            <a aria-label="Twitter" className="hover:opacity-100">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 4s-1 1.5-3 2.5c1-1.5.9-2.7.9-2.7s-1.1.8-2.4 1.1A4.3 4.3 0 0 0 12.5 9c0 .4 0 .7.1 1A11.5 11.5 0 0 1 4 5s-3 6.5 3 9.5c-1 .5-2 .6-3 .3 0 0 .8 4 5.5 4.5-1.5 1.2-4 2-6.5 1.7 4 2.4 8.8 2.7 12.2-.4 3-2.8 4-7 3.6-9.8A8 8 0 0 0 22 4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
