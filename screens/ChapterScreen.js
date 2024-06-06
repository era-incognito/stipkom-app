import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { completeChapter as completeChapterInAPI } from '../services/graphql';
import { colors } from '../constants/Colors';
import TheoreticalBlock from '../components/ChapterScreen/TheoreticalBlock';
import PracticalBlock from '../components/ChapterScreen/PracticalBlock';

const ChapterScreen = ({ route }) => {
  const { chapter, courseId, courseTitle, userInfo } = route.params;
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const navigation = useNavigation();

  const completeChapter = async () => {
    await completeChapterInAPI(userInfo.user.email, chapter.id);
    navigation.navigate('CourseDetails', { courseId, courseTitle, userInfo, refreshKey: Date.now() });
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < chapter.theoreticalBlocks.length + chapter.practicalBlocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
    } else {
      completeChapter();
    }
  };

  const handlePreviousBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  const theoreticalBlocks = chapter.theoreticalBlocks || [];
  const practicalBlocks = chapter.practicalBlocks || [];
  const currentBlock = [...theoreticalBlocks, ...practicalBlocks][currentBlockIndex];

  if (!currentBlock) {
    return <Text>Загрузка...</Text>;
  }

  const isTheoreticalBlock = theoreticalBlocks.some((block) => block.id === currentBlock.id);
  const isLastBlock = currentBlockIndex === theoreticalBlocks.length + practicalBlocks.length - 1;

  return (
    <View style={styles.container}>
      {isTheoreticalBlock ? (
        <TheoreticalBlock
          block={currentBlock}
          onNext={handleNextBlock}
          onPrevious={handlePreviousBlock}
          isFirst={currentBlockIndex === 0}
          isLast={isLastBlock}
          onComplete={isLastBlock ? completeChapter : undefined}
        />
      ) : (
        <PracticalBlock
          block={currentBlock}
          onNext={handleNextBlock}
          onPrevious={handlePreviousBlock}
          isFirst={currentBlockIndex === 0}
          isLast={isLastBlock}
          onComplete={isLastBlock ? completeChapter : undefined}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});

export default ChapterScreen;