import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { memberDashboardStyles } from '../../../styles/memberDashboardStyles';

const PURPLE = '#7E48DC';
const WHITE = '#FFF';

export default function MemberHeader({
  mandalData,
  onBack,
  quickActions,
  onQuickActionPress,
}) {
  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={memberDashboardStyles.quickActionItem}
      onPress={() => onQuickActionPress && onQuickActionPress(action)}
    >
      <View style={memberDashboardStyles.quickActionItemWrapper}>
        <View style={memberDashboardStyles.quickActionIconContainer}>
          <Icon name={action.icon} size={24} color={WHITE} />

        </View>
        <Text style={memberDashboardStyles.quickActionLabel}>{action.label}</Text>
        {action.hasNotification && (
          <View style={memberDashboardStyles.notificationDot} />
        )}
      </View>
    </TouchableOpacity>
  );


  return (
    <View>
      {/* Header */}
      <View style={memberDashboardStyles.memberHeader}>
        <View style={memberDashboardStyles.memberHeaderTop}>
          <TouchableOpacity onPress={onBack} style={memberDashboardStyles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={memberDashboardStyles.memberHeaderCenter}>
            <Image
              source={{ uri: mandalData.logo }}
              style={memberDashboardStyles.memberHeaderLogo}
            />
          </View>
          <View style={memberDashboardStyles.memberHeaderRight}>
            {mandalData.isPublic && (
              <>
                <Text style={memberDashboardStyles.publicText}>Public</Text>
                <Icon name="public" size={16} color="#ffffff" />
              </>
            )}
          </View>
        </View>

        {/* Mandal Info */}
        <View style={memberDashboardStyles.memberHeaderInfo}>
          <View style={memberDashboardStyles.memberHeaderInfoLeft}>
            <Text style={memberDashboardStyles.memberHeaderName} numberOfLines={2}>
              {mandalData.name}
            </Text>
            {mandalData.isVerified && (
              <Icon name="check-circle" size={20} color={PURPLE} />
            )}
          </View>
          <Text style={memberDashboardStyles.memberHeaderSubtitle}>
            {mandalData.subtitle}
          </Text>
        </View>
        {/* Quick Actions */}
        <View style={memberDashboardStyles.quickActionsContainer}>
          {quickActions && quickActions.map(renderQuickAction)}
        </View>
      </View>


    </View>
  );
}

