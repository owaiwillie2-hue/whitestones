import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logo from "@/assets/logo.jpg";

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="Whitestones Markets" className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Leading global investment firm dedicated to helping you achieve your financial goals.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#about" className="text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="/#investments" className="text-muted-foreground hover:text-primary">Investments</a></li>
              <li><a href="/#plans" className="text-muted-foreground hover:text-primary">Plans</a></li>
              <li><Link to="/signup" className="text-muted-foreground hover:text-primary">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('address')}: London, UK</li>
              <li className="pt-2">
                <a href="mailto:www.whitestonesmarkets@gmail.com" className="hover:text-primary">
                  {t('email')}: www.whitestonesmarkets@gmail.com
                </a>
              </li>
              <li>
                {t('phone')}: +44 20 1234 5678
              </li>
            </ul>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Whitestones Markets. {t('allRightsReserved')}</p>
        </div>
      </div>
      
      {/* Hidden Admin Access - Invisible to regular users */}
      <Link
        to="/admin-login"
        className="absolute bottom-0 left-0 w-1 h-1 opacity-0"
        aria-hidden="true"
      />
    </footer>
  );
};
