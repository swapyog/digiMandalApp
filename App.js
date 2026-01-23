import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/modules/splash/SplashScreen';
import {
  LanguageScreen,
  OnboardingScreen,
  PermissionsScreen,
  LoginScreen,
  OtpScreen,
} from './src/modules/auth';
import {
  MandalStep1,
  MandalStep2,
  MandalStep3,
  MandalStep4,
  BankDetailsScreen,
  MandalCreatedScreen,
} from './src/modules/mandal';
import { AdminDashboard, DonationsPage, MemberDashboard } from './src/modules/mandalDetails';
import { MainNavigator } from './src/modules/components';
import { StorageService } from './src/utils/storage';

function App() {
  const [screen, setScreen] = useState('splash');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check persisted state on app launch
  useEffect(() => {
    const checkPersistedState = async () => {
      try {
        let nextScreen = 'language'; // Default screen

        // Check if OTP is already verified
        const otpVerified = await StorageService.getOtpVerified();
        if (otpVerified) {
          const savedMobile = await StorageService.getMobileNumber();
          if (savedMobile) {
            setMobileNumber(savedMobile);
            // Check last screen to resume from there
            const lastScreen = await StorageService.getLastScreen();
            if (lastScreen && ['mandal-step-1', 'mandal-step-2', 'mandal-step-3', 'mandal-step-4', 'bank-details', 'mandal-created', 'homepage'].includes(lastScreen)) {
              nextScreen = lastScreen;
            } else {
              nextScreen = 'mandal-step-1';
            }
          }
        } else {
          // Check if mobile number is saved (but OTP not verified)
          const savedMobile = await StorageService.getMobileNumber();
          if (savedMobile) {
            setMobileNumber(savedMobile);
            nextScreen = 'otp';
          } else {
            // Check if permissions are already granted
            const phoneAccessGranted = await StorageService.getPermissionPhoneAccess();
            const phoneGranted = await StorageService.getPermissionPhone();
            const smsGranted = await StorageService.getPermissionSMS();
            const locationGranted = await StorageService.getPermissionLocation();

            if (phoneAccessGranted && phoneGranted && smsGranted && locationGranted) {
              nextScreen = 'login';
            } else {
              // Check if onboarding is completed
              const onboardingCompleted = await StorageService.getOnboardingCompleted();
              if (onboardingCompleted) {
                nextScreen = 'permissions';
              } else {
                // Check if language is selected
                const savedLanguage = await StorageService.getLanguage();
                if (savedLanguage) {
                  nextScreen = 'onboarding';
                }
              }
            }
          }
        }

        setIsLoading(false);

        // Show splash for at least 1.5 seconds, then navigate to the determined screen
        setTimeout(() => {
          setScreen(nextScreen);
        }, 1500);
      } catch (error) {
        console.error('Error checking persisted state:', error);
        setIsLoading(false);
        setTimeout(() => {
          setScreen('language');
        }, 1500);
      }
    };

    checkPersistedState();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {screen === 'splash' && <SplashScreen />}
      {screen === 'language' && (
        <LanguageScreen
          onNext={async () => {
            await StorageService.setLastScreen('onboarding');
            setScreen('onboarding');
          }}
        />
      )}
      {screen === 'onboarding' && (
        <OnboardingScreen
          onDone={async () => {
            await StorageService.setOnboardingCompleted(true);
            await StorageService.setLastScreen('permissions');
            setScreen('permissions');
          }}
        />
      )}
      {screen === 'permissions' && (
        <PermissionsScreen
          onNext={async () => {
            await StorageService.setLastScreen('login');
            setScreen('login');
          }}
        />
      )}
      {screen === 'login' && (
        <LoginScreen
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          onGetOtp={async () => {
            await StorageService.setMobileNumber(mobileNumber);
            await StorageService.setLastScreen('otp');
            setScreen('otp');
          }}
        />
      )}
      {screen === 'otp' && (
        <OtpScreen
          mobileNumber={mobileNumber}
          onBackToLogin={async () => {
            await StorageService.setLastScreen('login');
            setScreen('login');
          }}
          onVerified={async () => {
            await StorageService.setOtpVerified(true);
            await StorageService.setLastScreen('mandal-step-1');
            setScreen('mandal-step-1');
          }}
        />
      )}
      {screen === 'mandal-step-1' && (
        <MandalStep1
          onNext={async () => {
            await StorageService.setLastScreen('mandal-step-2');
            setScreen('mandal-step-2');
          }}
          onBack={async () => {
            await StorageService.setLastScreen('otp');
            setScreen('otp');
          }}
        />
      )}
      {screen === 'mandal-step-2' && (
        <MandalStep2
          onNext={async () => {
            await StorageService.setLastScreen('mandal-step-3');
            setScreen('mandal-step-3');
          }}
          onBack={async () => {
            await StorageService.setLastScreen('mandal-step-1');
            setScreen('mandal-step-1');
          }}
        />
      )}
      {screen === 'mandal-step-3' && (
        <MandalStep3
          onNext={async () => {
            await StorageService.setLastScreen('mandal-step-4');
            setScreen('mandal-step-4');
          }}
          onBack={async () => {
            await StorageService.setLastScreen('mandal-step-2');
            setScreen('mandal-step-2');
          }}
        />
      )}
      {screen === 'mandal-step-4' && (
        <MandalStep4
          onNext={async () => {
            await StorageService.setLastScreen('bank-details');
            setScreen('bank-details');
          }}
          onBack={async () => {
            await StorageService.setLastScreen('mandal-step-3');
            setScreen('mandal-step-3');
          }}
        />
      )}
      {screen === 'bank-details' && (
        <BankDetailsScreen
          onNext={async () => {
            await StorageService.setLastScreen('mandal-created');
            setScreen('mandal-created');
          }}
          onBack={async () => {
            await StorageService.setLastScreen('mandal-step-4');
            setScreen('mandal-step-4');
          }}
        />
      )}
      {screen === 'mandal-created' && (
        <MandalCreatedScreen
          onNext={async () => {
            await StorageService.setLastScreen('homepage');
            setScreen('homepage');
          }}
          onBack={async () => {
            await StorageService.setLastScreen('bank-details');
            setScreen('bank-details');
          }}
        />
      )}
      {screen === 'homepage' && (
        <MainNavigator
          onNavigateToAdminDashboard={async () => {
            await StorageService.setLastScreen('admin-dashboard');
            setScreen('admin-dashboard');
          }}
          onNavigateToMemberDashboard={async () => {
            await StorageService.setLastScreen('member-dashboard');
            setScreen('member-dashboard');
          }}
        />
      )}
      {screen === 'admin-dashboard' && (
        <AdminDashboard
          onBack={async () => {
            await StorageService.setLastScreen('homepage');
            setScreen('homepage');
          }}
          onNavigateToDonations={async () => {
            await StorageService.setLastScreen('donations');
            setScreen('donations');
          }}
        />
      )}
      {screen === 'donations' && (
        <DonationsPage
          onBack={async () => {
            await StorageService.setLastScreen('admin-dashboard');
            setScreen('admin-dashboard');
          }}
        />
      )}
      {screen === 'member-dashboard' && (
        <MemberDashboard
          onBack={async () => {
            await StorageService.setLastScreen('homepage');
            setScreen('homepage');
          }}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;



