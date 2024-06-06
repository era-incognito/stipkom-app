import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.EXPO_PUBLIC_HYGRAPH_API_ENDPOINT;
const token = process.env.EXPO_PUBLIC_HYGRAPH_API_TOKEN;

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const upsertStudentInHygraph = async (userInfo) => {
  const mutation = gql`
    mutation UpsertStudent($name: String!, $email: String!) {
      upsertStudent(
        where: { email: $email }
        upsert: {
          create: { name: $name, email: $email }
          update: { name: $name }
        }
      ) {
        id
      }
      publishStudent(where: {email: $email}) {
        id
      }
    }
  `;

  const variables = {
    name: userInfo.user.name,
    email: userInfo.user.email,
  };

  try {
    await client.request(mutation, variables);
    console.log('Student upserted in Hygraph');
  } catch (error) {
    console.error('Error upserting student in Hygraph:', error);
  }
};

export const fetchCourses = async () => {
  const query = gql`
    query {
      courses {
        id
        title
        description
        coverImage {
          url
        }
        chapters {
          id
          title
        }
        isTheoretical
        estimatedTime
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const fetchCourseDetails = async (courseId) => {
  const query = gql`
    query GetCourse($courseId: ID!) {
      course(where: { id: $courseId }) {
        id
        title
        description
        coverImage {
          url
        }
        chapters {
          id
          title
          theoreticalBlocks {
            id
            title
            content
            imageUrl
          }
          practicalBlocks {
            id
            type
            question
            options
            correctAnswer
          }
        }
        isTheoretical
        estimatedTime
      }
    }
  `;

  const variables = {
    courseId,
  };

  try {
    const data = await client.request(query, variables);
    return data.course;
  } catch (error) {
    console.error('Error fetching course details:', error);
    return null;
  }
};

export const fetchStudentDetails = async (studentEmail) => {
  const query = gql`
    query GetStudent($studentEmail: String!) {
      student(where: { email: $studentEmail }) {
        enrolledCourses {
          id
        }
        completedChapters {
          id
        }
      }
    }
  `;

  const variables = {
    studentEmail,
  };

  try {
    const data = await client.request(query, variables);
    return data.student;
  } catch (error) {
    console.error('Error fetching student details:', error);
    return null;
  }
};

export const enrollInCourse = async (studentEmail, courseId) => {
  const mutation = gql`
    mutation EnrollInCourse($studentEmail: String!, $courseId: ID!) {
      updateStudent(
        where: { email: $studentEmail }
        data: { enrolledCourses: { connect: { where: { id: $courseId } } } }
      ) {
        id
      }
      publishStudent(where: {email: $studentEmail}) {
        id
      }
    }
  `;

  const variables = {
    studentEmail,
    courseId,
  };

  try {
    await client.request(mutation, variables);
    console.log('Student enrolled in course');
  } catch (error) {
    console.error('Error enrolling student in course:', error);
  }
};

export const completeChapter = async (studentEmail, chapterId) => {
  const mutation = gql`
    mutation CompleteChapter($studentEmail: String!, $chapterId: ID!) {
      updateStudent(
        where: { email: $studentEmail }
        data: { completedChapters: { connect: { where: { id: $chapterId } } } }
      ) {
        id
      }
      publishStudent(where: {email: $studentEmail}) {
        id
      }
    }
  `;

  const variables = {
    studentEmail,
    chapterId,
  };

  try {
    await client.request(mutation, variables);
    console.log('Chapter completed');
  } catch (error) {
    console.error('Error completing chapter:', error);
  }
};