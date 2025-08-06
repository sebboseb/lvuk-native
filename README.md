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

# src/task.ts

- Added debouce to search to not overload with requests
- Bug: Infinite requests. Fixed by adding a dependency array to useEffect
- Wrapped fetchUsers in useCallback to avoid recreating it on every render.
- Used useMemo for filtered users to prevent unnecessary recalculations.

# components/ParallaxScrollView.tsx

- Fixed nested VirtualizedLists bug

# hooks/useDebounce.ts

- useDebounce hook
