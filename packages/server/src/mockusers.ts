export const mockUsers = [
  {
    id: "1",
    username: "alice_wonder",
    email: "alice@example.com",
    passwordHash: "hashed_password_1",
    profilePic: "https://example.com/alice.jpg",
    createdAt: new Date(),
    following: ["2", "3"],
    followers: ["2"],
  },
  {
    id: "2",
    username: "bob_builder",
    email: "bob@example.com",
    passwordHash: "hashed_password_2",
    profilePic: "https://example.com/bob.jpg",
    createdAt: new Date(),
    following: ["1"],
    followers: ["1", "3"],
  },
  {
    id: "3",
    username: "charlie_chaplin",
    email: "charlie@example.com",
    passwordHash: "hashed_password_3",
    profilePic: "https://example.com/charlie.jpg",
    createdAt: new Date(),
    following: ["1", "2"],
    followers: [],
  },
  {
    id: "4",
    username: "diana_prince",
    email: "diana@example.com",
    passwordHash: "hashed_password_4",
    profilePic: "https://example.com/diana.jpg",
    createdAt: new Date(),
    following: [],
    followers: [],
  },
];
