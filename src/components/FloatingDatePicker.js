import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingLabelInput from './FloatingLabelInput';

const PURPLE = '#7b3cff';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function FloatingDatePicker({
  label,
  value,
  onChange,
  placeholder = 'In DD/MM/YYYY Format',
  containerStyle,
  error,
  helperText,
  minimumDate,
  maximumDate,
}) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    if (value) {
      const date = parseDate(value);
      return date || new Date();
    }
    return new Date();
  });
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  // Parse date string (DD/MM/YYYY) to Date object
  function parseDate(dateString) {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  }

  // Format Date object to DD/MM/YYYY string
  function formatDate(date) {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleOpenPicker = () => {
    if (value) {
      const parsed = parseDate(value);
      if (parsed) {
        setSelectedDate(parsed);
        setCurrentMonth(parsed.getMonth());
        setCurrentYear(parsed.getFullYear());
      }
    }
    setPickerVisible(true);
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day, month, year) => {
    const date = new Date(year, month, day);
    if (minimumDate && date < minimumDate) return true;
    if (maximumDate && date > maximumDate) return true;
    return false;
  };

  const isToday = (day, month, year) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day, month, year) => {
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    const formatted = formatDate(selectedDate);
    if (onChange) {
      onChange(formatted);
    }
    setPickerVisible(false);
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day, currentMonth, currentYear);
      const isDayToday = isToday(day, currentMonth, currentYear);
      const isDaySelected = isSelected(day, currentMonth, currentYear);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isDaySelected && styles.calendarDaySelected,
            isDayToday && !isDaySelected && styles.calendarDayToday,
            isDisabled && styles.calendarDayDisabled,
          ]}
          onPress={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.calendarDayText,
              isDaySelected && styles.calendarDayTextSelected,
              isDisabled && styles.calendarDayTextDisabled,
              isDayToday && !isDaySelected && !isDisabled && styles.calendarDayTextToday,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenPicker} activeOpacity={0.7}>
        <FloatingLabelInput
          label={label}
          value={value}
          onChangeText={() => {}}
          placeholder={placeholder}
          editable={false}
          rightIconName="calendar-today"
          containerStyle={containerStyle}
          error={error}
          helperText={helperText}
        />
      </TouchableOpacity>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.datePickerOverlay}>
          <View style={styles.datePickerCard}>
            <Text style={styles.datePickerTitle}>Select Date</Text>
            
            {/* Month/Year Navigation */}
            <View style={styles.datePickerHeader}>
              <TouchableOpacity
                style={styles.datePickerNavButton}
                onPress={() => handleMonthChange('prev')}
              >
                <Icon name="chevron-left" size={24} color="#111827" />
              </TouchableOpacity>
              <View style={styles.datePickerMonthYear}>
                <Text style={styles.datePickerMonthYearText}>
                  {monthNames[currentMonth]} {currentYear}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.datePickerNavButton}
                onPress={() => handleMonthChange('next')}
              >
                <Icon name="chevron-right" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Week Day Headers */}
            <View style={styles.calendarWeekDays}>
              {dayNames.map((day) => (
                <View key={day} style={styles.calendarWeekDay}>
                  <Text style={styles.calendarWeekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Days */}
            <View style={styles.calendarDaysContainer}>
              {renderCalendarDays()}
            </View>

            <View style={styles.datePickerButtons}>
              <TouchableOpacity
                style={[styles.datePickerButton, styles.datePickerButtonCancel]}
                onPress={() => setPickerVisible(false)}
              >
                <Text style={[styles.datePickerButtonText, styles.datePickerButtonTextCancel]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.datePickerButton, styles.datePickerButtonConfirm]}
                onPress={handleConfirm}
              >
                <Text style={[styles.datePickerButtonText, styles.datePickerButtonTextConfirm]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  datePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  datePickerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerMonthYear: {
    flex: 1,
    alignItems: 'center',
  },
  datePickerMonthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  datePickerNavButton: {
    padding: 8,
  },
  calendarWeekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarWeekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  calendarDaySelected: {
    backgroundColor: PURPLE,
  },
  calendarDayToday: {
    backgroundColor: '#e3d8f7',
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#111827',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  calendarDayTextToday: {
    color: PURPLE,
    fontWeight: '600',
  },
  calendarDayTextDisabled: {
    color: '#9ca3af',
  },
  datePickerButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  datePickerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  datePickerButtonCancel: {
    backgroundColor: '#f3f4f6',
  },
  datePickerButtonConfirm: {
    backgroundColor: PURPLE,
  },
  datePickerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  datePickerButtonTextCancel: {
    color: '#6b7280',
  },
  datePickerButtonTextConfirm: {
    color: '#FFFFFF',
  },
});

