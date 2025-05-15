# LeoVegasUK Native Candidate Task

This is a butchered version of an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Fire up the app for details of the test task 🦁

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Add the explaination of your changes here 🦁

...

1. Flatlist Optimization
- Replaced nested scroll views and ParallaxScrollView with a properly structured FlatList.

- Moved TextInput and Image into FlatList's ListHeaderComponent to avoid nesting issues warning.

Used FlatList performance props for better performace:

* initialNumToRender={10}
* maxToRenderPerBatch={10}
* windowSize={5}
* removeClippedSubviews={true}
* keyboardShouldPersistTaps="handled"

2. Removed redundant useEffect calls for fetching and filtering users since were were already not using pagination on api so did the filtering part on pre-fetched users list.

3. Typescript Enhancments
- Defined a User type for better type safety.

4. Redux Toolkit Integration

- Used createAsyncThunk for API calls with error and loading state handling.

- Moved all API logic out of the component, improving maintainability and testability.

5. Memoization for Performance

- Wrapped renderItem and keyExtractor in useCallback() to prevent unnecessary re-renders of list items.

6. Styling Improvements

- Created clear, responsive styling for the header image, input field, and list items.





------------------------------------------------------------------------------------------