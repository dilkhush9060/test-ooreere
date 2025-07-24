import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Routes, Route, BrowserRouter} from "react-router";
import "./index.css";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {querryClient} from "./utils/querryClient.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Signup from "./pages/auth/Signup.tsx";
import Login from "./pages/auth/login.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import TermsOfUse from "./pages/(legal)/TermsOfUse.tsx";
import TermsAndServices from "./pages/(legal)/TermsAndServices.tsx";
import RefundPolicy from "./pages/(legal)/RefundPolicy.tsx";
import PrivacyPolicy from "./pages/(legal)/PrivacyPolicy.tsx";
import EmailVerification from "./pages/auth/emailVerification.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import Profile from "./pages/Profile.tsx";
import Checkout from "./pages/Checkout.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import Admin from "./pages/admin/Admin.tsx";
import ChangePassword from "./pages/Changepassword.tsx";
import PaymentSuccess from "./pages/Paymentdone.tsx";
import Mypurchase from "./pages/Mypurchase.tsx";
import NavigateWrapper from "./components/NavigateWrapper.ts";

import Myplan from "./pages/Mysingleplan.tsx";
import Deleteaccount from "./pages/Deleteaccount.tsx";
import Deleteotp from "./pages/Deleteotp.tsx";
import Subscription from "./pages/admin/Subscription.tsx";
import Validate from "./pages/admin/Validate.tsx";
import ChangePrice from "./pages/admin/ChangePrice.tsx";

import CityAdd from "./pages/admin/CityAdd.tsx";
import {NavBar} from "./pages/Test.tsx";
import Message from "./pages/admin/Message.tsx";
import HeroSection from "./pages/admin/HeroSection.tsx";
import {Support} from "./pages/Support.tsx";
import ResendEmailVerification from "./pages/auth/resendEmailVerify.tsx";
import Order from "./pages/admin/Order.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={querryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <NavigateWrapper>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />

              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/test" element={<NavBar />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndServices />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              <Route
                path="/checkout"
                element={
                  <AuthProvider authenticated={true}>
                    <Checkout />
                  </AuthProvider>
                }
              />
              <Route
                path="profile"
                element={
                  <AuthProvider authenticated={true}>
                    <Profile />
                  </AuthProvider>
                }
              />
              <Route
                path="support"
                element={
                  <AuthProvider authenticated={true}>
                    <Support />
                  </AuthProvider>
                }
              />
              <Route
                path="change-password"
                element={
                  <AuthProvider authenticated={true}>
                    <ChangePassword />
                  </AuthProvider>
                }
              />
              <Route
                path="delete-account"
                element={
                  <AuthProvider authenticated={true}>
                    <Deleteaccount />
                  </AuthProvider>
                }
              />
              <Route
                path="delete-otp"
                element={
                  <AuthProvider authenticated={true}>
                    <Deleteotp />
                  </AuthProvider>
                }
              />
              <Route
                path="my-purchase"
                element={
                  <AuthProvider authenticated={true}>
                    <Mypurchase />
                  </AuthProvider>
                }
              />
              <Route
                path="myplan/:id"
                element={
                  <AuthProvider authenticated={true}>
                    <Myplan />
                  </AuthProvider>
                }
              />
            </Route>
            <Route element={<AuthLayout />}>
              <Route
                path="signin"
                element={
                  <AuthProvider authenticated={false}>
                    <Login />
                  </AuthProvider>
                }
              />
              <Route
                path="register"
                element={
                  <AuthProvider authenticated={false}>
                    <Signup />
                  </AuthProvider>
                }
              />
              <Route
                path="email-verify"
                element={
                  <AuthProvider authenticated={false}>
                    <EmailVerification />
                  </AuthProvider>
                }
              />

              <Route
                path="resend-email-verification"
                element={
                  <AuthProvider authenticated={false}>
                    <ResendEmailVerification />
                  </AuthProvider>
                }
              />
              <Route
                path="reset-password"
                element={
                  <AuthProvider authenticated={false}>
                    <ResetPassword />
                  </AuthProvider>
                }
              />
              <Route
                path="forgot-password"
                element={
                  <AuthProvider authenticated={false}>
                    <ForgotPassword />
                  </AuthProvider>
                }
              />
              <Route
                path="/payment-status"
                element={
                  <AuthProvider authenticated={true}>
                    <PaymentSuccess />
                  </AuthProvider>
                }
              />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/order" element={<Order />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/validate" element={<Validate />} />
              <Route path="/change-price" element={<ChangePrice />} />
              <Route path="/city-addons" element={<CityAdd />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/hero-section" element={<HeroSection />} />
            </Route>
          </Routes>
        </NavigateWrapper>
      </BrowserRouter>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
