export const fetchPostHogEvents = async (eventName) => {
  try {
    const response = await fetch(
      `${process.env.POSTHOG_API_URL}?event=${eventName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching PostHog events:", error);
    throw error;
  }
};
