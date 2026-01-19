import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeStyles } from '../../../styles/homeStyles';
import { JoinButton, ModalButton, PrimaryButton, SelectionModal, ToggleButton } from '../../../components';

export default function PostCard({ item, hideHeader = false, hideJoinButton = false, hideActions = false }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikePress = () => {
    if (isDisliked) {
      setIsDisliked(false);
    }
    setIsLiked(!isLiked);
  };

  const handleDislikePress = () => {
    if (isLiked) {
      setIsLiked(false);
    }
    setIsDisliked(!isDisliked);
  };

  return (
    <View style={homeStyles.postCard}>
      {!hideHeader && (
        <View style={homeStyles.postHeader}>
          <View style={homeStyles.postHeaderLeft}>
            <View style={homeStyles.postAvatar}>
              {item.avatarUrl ? (
                <Image
                  source={{ uri: item.avatarUrl }}
                  style={homeStyles.postAvatarEmoji}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-vector/colorful-mandala-illustration-with-geometric-floral-design_779267-3035.jpg?semt=ais_hybrid&w=740&q=80',
                  }}
                  style={homeStyles.postAvatarEmoji}
                  resizeMode="cover"
                />
              )}
            </View>
            <View>
              <Text style={homeStyles.postMandalName}>{item.mandalName}</Text>
              <Text style={homeStyles.postTime}>{item.timeAgo}</Text>
            </View>
          </View>
          <JoinButton />
          
        </View>
      )}

      <Text style={homeStyles.postText}>{item.text}</Text>
      

      {item.userName && (
        <View style={homeStyles.postUserInfo}>
          <Text style={homeStyles.postUserName}>{item.userName}</Text>
          {item.isTopVoice && (
            <View style={homeStyles.topVoiceBadge}>
              <Text style={homeStyles.topVoiceIcon}>
                <Icon name="star" size={24} color="#000" />
              </Text>
              <Text style={homeStyles.topVoiceText}>Top Voice</Text>
            </View>
          )}
        </View>
      )}

      {item.eventTag && (
        <View style={homeStyles.eventTag}>
          <Text style={homeStyles.eventTagText}>{item.eventTag}</Text>
        </View>
      )}

      {item.hasMedia && (
        <View style={homeStyles.postMedia}>
          {item.mediaType === 'event' ? (
            <View style={homeStyles.eventMediaContainer}>
              <View style={homeStyles.eventMediaLeft}>
                <Image
                  source={{
                    uri: 'https://i.pinimg.com/736x/48/07/a3/4807a3c7399db01305c85ed3f4e24f38.jpg',
                  }}
                  style={homeStyles.eventMediaImage}
                  resizeMode="cover"
                />
              </View>
              <View style={homeStyles.eventMediaRight}>
                <Text style={homeStyles.eventMediaLogo}>LATESTLY.com</Text>
                <Text style={homeStyles.eventMediaTitle}>GANESH VISARJAN 2025</Text>
                <View style={homeStyles.eventMediaBar}>
                  <Text style={homeStyles.eventMediaBarText}>AFTER 3 DAYS</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={homeStyles.postImagePlaceholder}>
              <Image
                source={{
                  uri: 'https://advancedct.com/wp-content/uploads/2021/09/shutterstock_92209726.jpg',
                }}
                style={homeStyles.postImage}
                resizeMode="cover"
              />
              <View style={homeStyles.speakerIcon}>
                <Icon name="volume-up" size={22} color="#ffffff" />
              </View>
            </View>
          )}
        </View>
      )}

      {item.eventTag && !hideJoinButton && (
        <TouchableOpacity style={homeStyles.joinEventButton}>
          <Text style={homeStyles.joinEventButtonText}>Join Event {'>'}</Text>
        </TouchableOpacity>
      )}

      {!hideActions && (
        <View style={homeStyles.postActionsOuter}>
        <TouchableOpacity style={homeStyles.postAction} onPress={handleLikePress}>
          <Text style={homeStyles.postActionIcon}>
            <Icon 
              name={isLiked ? "thumb-up-alt" : "thumb-up-off-alt"} 
              size={22} 
              color="#111827" 
            />
          </Text>
          {item.likes && <Text style={homeStyles.postActionCount}>{item.likes}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.postAction} onPress={handleDislikePress}>
          <Text style={homeStyles.postActionIcon}>
            <Icon 
              name={isDisliked ? "thumb-down-alt" : "thumb-down-off-alt"} 
              size={22} 
              color="#111827" 
            />
          </Text>
          {item.dislikes && (
            <Text style={homeStyles.postActionCount}>{item.dislikes}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.postAction}>
          <Text style={homeStyles.postActionIcon}>
            <Icon name="chat-bubble-outline" size={22} color="#111827" />
          </Text>
          {item.comments && (
            <Text style={homeStyles.postActionCount}>{item.comments}</Text>
          )}
        </TouchableOpacity>
        <View style={homeStyles.postActionSpacer} />
        <TouchableOpacity style={homeStyles.postAction}>
          <Icon name="share" size={22} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.postAction}>
          <Icon name="favorite-border" size={22} color="#111827" />
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}

