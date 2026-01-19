import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/appStyles';

export default function SelectionModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
  showSearch = false,
  searchPlaceholder = 'Search',
  sections,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [filteredSections, setFilteredSections] = useState(sections);

  useEffect(() => {
    if (showSearch && searchQuery.trim()) {
      if (sections) {
        // Filter sections when search is active
        const filtered = sections.map(section => ({
          ...section,
          options: section.options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        })).filter(section => section.options.length > 0);
        setFilteredSections(filtered);
      } else {
        // Filter regular options
        const filtered = options.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOptions(filtered);
      }
    } else {
      setFilteredOptions(options);
      setFilteredSections(sections);
    }
  }, [searchQuery, options, sections, showSearch]);

  useEffect(() => {
    if (!visible) {
      setSearchQuery('');
    }
  }, [visible]);

  const displayOptions = filteredOptions;
  const displaySections = filteredSections;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.selectionModalOverlay}>
        <View style={styles.selectionModalCard}>
          <Text style={styles.selectionModalTitle}>{title}</Text>

          {showSearch && (
            <View style={styles.selectionModalSearchContainer}>
              <TextInput
                style={styles.selectionModalSearchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Icon name="search" size={20} color="#6b7280" style={styles.selectionModalSearchIcon} />
            </View>
          )}

          <ScrollView
            style={styles.selectionModalList}
            showsVerticalScrollIndicator={false}
          >
            {displaySections ? (
              displaySections.map((section, sectionIndex) => (
                <View key={section.title || sectionIndex}>
                  {!searchQuery.trim() && (
                    <Text style={styles.selectionModalSectionTitle}>
                      {section.title}
                    </Text>
                  )}
                  {section.options.map((option, index) => {
                    const isSelected = selectedValue === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value || index}
                        style={[
                          styles.selectionModalItem,
                          isSelected && styles.selectionModalItemSelected,
                        ]}
                        onPress={() => onSelect(option.value)}
                      >
                        <Text
                          style={[
                            styles.selectionModalItemText,
                            isSelected && styles.selectionModalItemTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                        {isSelected && (
                          <Icon name="check" size={20} color="#7b3cff" style={styles.selectionModalCheckmark} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))
            ) : (
              displayOptions.map((option, index) => {
                const isSelected = selectedValue === option.value;
                return (
                  <TouchableOpacity
                    key={option.value || index}
                    style={[
                      styles.selectionModalItem,
                      isSelected && styles.selectionModalItemSelected,
                      index === 0 && styles.selectionModalItemFirst,
                      index === displayOptions.length - 1 &&
                        styles.selectionModalItemLast,
                    ]}
                    onPress={() => onSelect(option.value)}
                  >
                    <Text
                      style={[
                        styles.selectionModalItemText,
                        isSelected && styles.selectionModalItemTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Icon name="check" size={20} color="#7b3cff" style={styles.selectionModalCheckmark} />
                    )}
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.selectionModalButton}
            onPress={onClose}
          >
            <Text style={styles.selectionModalButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

