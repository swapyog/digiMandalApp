import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../styles/appStyles';
import { StorageService } from '../../utils/storage';
import { ModalButton } from '../../components';

export default function PermissionsScreen({ onNext }) {
  const [modal, setModal] = useState(null);
  const [allowAccessVisible, setAllowAccessVisible] = useState(false);
  const [permissionsChecked, setPermissionsChecked] = useState(false);

  // Check if permissions are already granted on mount
  useEffect(() => {
    const checkPermissions = async () => {
      const phoneAccessGranted = await StorageService.getPermissionPhoneAccess();
      const phoneGranted = await StorageService.getPermissionPhone();
      const smsGranted = await StorageService.getPermissionSMS();
      const locationGranted = await StorageService.getPermissionLocation();

      // If all permissions are granted, skip to next screen
      if (phoneAccessGranted && phoneGranted && smsGranted && locationGranted) {
        setPermissionsChecked(true);
        // Auto-advance after a brief moment
        setTimeout(() => {
          onNext();
        }, 100);
        return;
      }

      setPermissionsChecked(true);
    };

    checkPermissions();
  }, [onNext]);

  const openNextModal = async current => {
    if (current === 'phone') {
      await StorageService.setPermissionPhone(true);
      setModal('sms');
    } else if (current === 'sms') {
      await StorageService.setPermissionSMS(true);
      setModal('location');
    } else if (current === 'location') {
      await StorageService.setPermissionLocation(true);
      setModal(null);
      onNext();
    }
  };

  const PermissionModal = ({ type, visible }) => {
    if (!type) {
      return null;
    }

    const titles = {
      location: 'Grant Location Permission',
      phone: 'Grant Phone Permission',
      sms: 'Grant SMS Permission',
    };

    const icons = {
      phone: 'phone',
      sms: 'sms',
      location: 'location-on',
    };

    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalIcon, { justifyContent: 'center', alignItems: 'center' }]}>
              <Icon name={icons[type]} size={28} color="#000" />
            </View>
            <Text style={styles.modalTitle}>{titles[type]}</Text>
            <Text style={styles.modalText}>
              This permission is required to proceed with the verification
              process.
            </Text>

            <ModalButton
              primaryLabel="Allow"
              secondaryLabel="Exit"
              onPrimaryPress={() => openNextModal(type)}
              onSecondaryPress={() => setModal(null)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const AllowAccessModal = () => (
    <Modal
      animationType="fade"
      transparent
      visible={allowAccessVisible}
      onRequestClose={() => setAllowAccessVisible(false)}
    >
      <View style={styles.fullscreenOverlay}>
        <View style={styles.allowAccessCard}>
          <View style={[styles.allowAccessIcon, { justifyContent: 'center', alignItems: 'center' }]}>
            <Icon name="phone" size={28} color="#000" />
          </View>
          <Text style={styles.allowAccessTitle}>
            Allow DigiMandal to Access your phone?
          </Text>
          <TouchableOpacity
            style={styles.allowAccessOption}
            onPress={async () => {
              await StorageService.setPermissionPhoneAccess(true);
              setAllowAccessVisible(false);
              setModal('phone');
            }}
          >
            <Text style={styles.allowAccessOptionText}>Always Allow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.allowAccessOption}
            onPress={async () => {
              await StorageService.setPermissionPhoneAccess(true);
              setAllowAccessVisible(false);
              setModal('phone');
            }}
          >
            <Text style={styles.allowAccessOptionText}>
              Keep allow only while using App
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.allowAccessOption}
            onPress={() => setAllowAccessVisible(false)}
          >
            <Text style={styles.allowAccessOptionText}>Deny</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <SafeAreaView style={styles.permissionsRoot}>
        <View style={[styles.permissionsHeaderIcon]}>
          <Icon name="settings" size={34} color="#000" />
        </View>
        <Text style={styles.permissionsTitle}>
          For better experience, we may need few permissions
        </Text>
        <Text style={styles.permissionsSubtitle}>
          Please allow the permissions necessary for providing services
        </Text>

        <View style={styles.permissionsList}>
          <View style={styles.permissionItem}>
            <View style={[styles.permissionIcon, { justifyContent: 'center', alignItems: 'center' }]}>
              <Icon name="phone" size={24} color="#000" />
            </View>
            <View style={styles.permissionTextContainer}>
              <Text style={styles.permissionTitle}>Phone</Text>
              <Text style={styles.permissionDescription}>
                To access your phone number and network information
              </Text>
            </View>
          </View>

          <View style={styles.permissionItem}>
            <View style={[styles.permissionIcon, { justifyContent: 'center', alignItems: 'center' }]}>
              <Icon name="sms" size={24} color="#000" />
            </View>
            <View style={styles.permissionTextContainer}>
              <Text style={styles.permissionTitle}>SMS</Text>
              <Text style={styles.permissionDescription}>
                To verify your phone number for registration
              </Text>
            </View>
          </View>

          <View style={styles.permissionItem}>
            <View style={[styles.permissionIcon, { justifyContent: 'center', alignItems: 'center' }]}>
              <Icon name="location-on" size={24} color="#000" />
            </View>
            <View style={styles.permissionTextContainer}>
              <Text style={styles.permissionTitle}>Location</Text>
              <Text style={styles.permissionDescription}>
                To offer services based on your location more seamlessly.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButtonBottom}
          onPress={async () => {
            // Check if permissions are already granted
            const phoneAccessGranted = await StorageService.getPermissionPhoneAccess();
            const phoneGranted = await StorageService.getPermissionPhone();
            const smsGranted = await StorageService.getPermissionSMS();
            const locationGranted = await StorageService.getPermissionLocation();

            // If all permissions granted, skip modals and go to next screen
            if (phoneAccessGranted && phoneGranted && smsGranted && locationGranted) {
              onNext();
              return;
            }

            // Otherwise show modals
            if (!allowAccessVisible && !modal) {
              setAllowAccessVisible(true);
              return;
            }
            if (allowAccessVisible && !modal) {
              setAllowAccessVisible(false);
              setModal('phone');
              return;
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.primaryButtonText}>Next</Text>
            <Icon name="chevron-right" size={20} color="#ffffff" style={{ marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <PermissionModal type={modal} visible={modal !== null} />
      <AllowAccessModal />
    </>
  );
}


