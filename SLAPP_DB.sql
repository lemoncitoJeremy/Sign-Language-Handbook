-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 03:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `signlanguageapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `accountID` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `role` varchar(30) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `datecreated` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accountID`, `username`, `email`, `password`, `role`, `status`, `datecreated`, `last_login`) VALUES
(1, 'jeremylemoncito', 'jeremy.lemoncito@adamson.edu.ph', '$2b$10$EZT0tCEv4UEHZLed9hbujuv8.m0awtCZLRYspBLuOTGb4S7Wv/lfK', 'VL', NULL, NULL, NULL),
(4, 'Burat', 'jeremy@gmail.com', '$2b$10$yxvcb8ujzxV36gD49AHs2uxstwXBoUgTNMGARJyIXqpqWk0dnM05O', 'VL', NULL, NULL, NULL),
(5, 'MYMY', 'john.wick@gmail.com', '$2b$10$Hko47NSHlQNTtnNADe18TuucB3n63mn4DUQwqqdqFP45qNMymRd06', 'VL', NULL, NULL, NULL),
(6, 'TESTING', 'lemoncitojeremy@gmail.com', '$2b$10$Lp661aEJJVP2mJrhoBDyyOawpjeAR9/URhbNdKetWIHf8e0UPPobq', 'VL', NULL, NULL, NULL),
(7, 'testing', 'testing@gmail.com', '$2b$10$n2MyiQayUGxRe2qK20ouNefIp3YO0LXGsX.scrE3edrxZKOVKCXwS', 'VL', NULL, NULL, NULL),
(8, 'mcdo', 'mcdonalds@gmail.com', '$2b$10$zvCq0EwiUAzHsiGoEGIQROGQcAIzLr9IbvDIXoROO0FzjoONXkgze', 'VL', NULL, NULL, NULL),
(9, 'myusername', 'myemail@gmail.com', '$2b$10$BxaPoxpZwo1N5p85HNrsO.WI.z3JyLB2RnFmzIhC8m2o781lMPg7S', 'VL', NULL, NULL, NULL),
(10, 'purpose', 'purpose@gmail.com', '$2b$10$SVCaSddymwadgmvO6NjuxO.sHW42t.kGlxEXh4q5Eg3XAkj1rjjL.', 'VL', NULL, NULL, NULL),
(11, 'TESTING', 'TESTING', '$2b$10$dsom/S46uaHxq9KV7GXhpePbdgX03VcROIXU0hQQCh9vFWVhH.bUu', 'VL', NULL, NULL, NULL),
(12, 'model', 'model', '$2b$10$ez3NJ0ourfeZvNN3KwlOmOxTjt9E.dH2/frFb1g4iADGPI.M5uqim', 'VL', NULL, NULL, NULL),
(13, 'create', 'create', '$2b$10$Ug1tEmcmzdE5kaD316Nl1uxYeytk6hjTpNloL/9baX1gV72SIeJHu', 'VL', NULL, NULL, NULL),
(14, 'czech', 'czech', '$2b$10$FqQVDD4MAdRDN5SyJ/IPrueMnM5eCtvORkiTSYdvLOXBeDWwuyL2m', 'VL', NULL, NULL, NULL),
(15, 'Lemonade', 'lemoncitojeremys@gmail.com', '$2b$10$oJRjvloT/Tj82N6JWZGEyuRgQsiLrc763iujAkCC61trfvqNkq69C', 'VL', NULL, NULL, NULL),
(16, 'mmm', 'mmm', '$2b$10$rhakA2EV9Q9FqJ/Q5TMjoezO8nLE7NH32JYKWC4HNjK/9wD7jNO5q', 'VL', NULL, NULL, NULL),
(17, 'lemon', 'lemon@gmail.com', '$2b$10$4LJZHNLqBoDwYAqXAyqhke7Ee5NmchKoBh1JzQwqlipqoXjm.Ay0u', 'VL', NULL, NULL, NULL),
(18, 'firstTesting', 'first.testing@gmail.com', '$2b$10$r17/4IKIX8XoWNg9OJEFxOuEJXEt3YxhLpxPjX0Di/0K7JTmL9F4K', 'VL', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accounts_archived`
--

CREATE TABLE `accounts_archived` (
  `accountID` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `role` varchar(30) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `datecreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts_archived`
--

INSERT INTO `accounts_archived` (`accountID`, `username`, `email`, `password`, `role`, `status`, `datecreated`, `last_login`) VALUES
(3, 'Lemon', 'lemon@gmail.com', 'Admin3', 'Admin', 'Active', '2024-05-20 12:39:37', '2024-05-20 12:39:37'),
(4, 'Ormin', 'Ormin@gmail.com', 'admin4', 'Admin', 'Active', '2024-05-20 12:39:37', '2024-05-20 12:39:37');

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE `dictionary` (
  `signlanguageID` int(11) NOT NULL,
  `name` varchar(5) DEFAULT NULL,
  `sign_description` varchar(150) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dictionary`
--

INSERT INTO `dictionary` (`signlanguageID`, `name`, `sign_description`, `image_url`) VALUES
(1, 'Aa', 'The letter A is signed by forming a fist with your thumb resting against the side of your index finger.', NULL),
(2, 'Bb', 'The letter B is signed by holding your hand up, palm facing outward, with your fingers closed and thumb tucked into your palm.', NULL),
(3, 'Cc', 'The letter C is signed by making a C shape with your hand, with your thumb and fingers forming a circle.', NULL),
(4, 'Dd', 'The letter D is signed by making a fist with your index finger extended and pointing upward, resembling the letter D.', NULL),
(5, 'Ee', 'The letter E is signed by holding your hand up, palm facing inward, with all fingers extended and close together.', NULL),
(6, 'Ff', 'The letter F is signed by holding your hand up, palm facing outward, with your index finger extended and your thumb tucked under your other fingers.', NULL),
(7, 'Gg', 'The letter G is signed by making a fist with your thumb extended and pointing upward, resembling the letter G.', NULL),
(8, 'Hh', 'The letter H is signed by making a fist with your index and middle fingers extended and touching your thumb, resembling the letter H.', NULL),
(9, 'Ii', 'The letter I is signed by holding your hand up, palm facing inward, with your index finger extended and pointing upward.', NULL),
(10, 'Jj', 'The letter J is signed by making a J shape with your index finger extended and curved downward.', NULL),
(11, 'Kk', 'The letter K is signed by making a fist with your thumb extended and touching your index finger, resembling the letter K.', NULL),
(12, 'Ll', 'The letter L is signed by holding your hand up, palm facing inward, with your thumb extended and pointing upward.', NULL),
(13, 'Mm', 'The letter M is signed by making a fist with your thumb extended and crossing your other fingers, resembling the letter M.', NULL),
(14, 'Nn', 'The letter N is signed by making a fist with your thumb extended and pointing outward, resembling the letter N.', NULL),
(15, 'Oo', 'The letter O is signed by making a circle with your index finger and thumb, resembling the letter O.', NULL),
(16, 'Pp', 'The letter P is signed by making a fist with your thumb extended and pointing forward, resembling the letter P.\r\n', NULL),
(17, 'Qq', 'The letter Q is signed by making a Q shape with your index finger and thumb, resembling the letter Q.', NULL),
(18, 'Rr', 'The letter R is signed by holding your hand up, palm facing inward, with your index and middle fingers extended and crossed.', NULL),
(19, 'Ss', 'The letter S is signed by making a fist with your thumb extended and pointing downward, resembling the letter S.', NULL),
(20, 'Tt', 'The letter T is signed by making a fist with your index finger extended and pointing outward, resembling the letter T.', NULL),
(21, 'Uu', 'The letter U is signed by holding your hand up, palm facing inward, with your index and middle fingers extended and spread apart.', NULL),
(22, 'Vv', 'The letter V is signed by making a V shape with your index and middle fingers, with your palm facing inward.', NULL),
(23, 'Ww', 'The letter W is signed by making a W shape with your index, middle, and ring fingers, with your palm facing inward.', NULL),
(24, 'Xx', 'The letter X is signed by crossing your index and middle fingers, with your thumb tucked under your other fingers.', NULL),
(25, 'Yy', 'The letter Y is signed by extending your index and middle fingers upward and slightly apart, resembling the letter Y.', NULL),
(26, 'Zz', 'The letter Z is signed by making a Z shape with your index finger and thumb, with your palm facing outward.', NULL),
(27, '0', NULL, NULL),
(28, '1', NULL, NULL),
(29, '2', NULL, NULL),
(30, '3', NULL, NULL),
(31, '4', NULL, NULL),
(32, '5', NULL, NULL),
(33, '6', NULL, NULL),
(34, '7', NULL, NULL),
(35, '8', NULL, NULL),
(36, '9', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `FeedbackID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Star_Rating` int(11) NOT NULL,
  `AdminResponded` varchar(250) DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`FeedbackID`, `Email`, `Description`, `Star_Rating`, `AdminResponded`) VALUES
(7, 'rionhermoso89@gmail.com', 'try', 4, 'No'),
(8, 'rionhermoso89@gmail.com', 'dsadasdasdasdasdasd', 3, 'No'),
(9, 'rionhermoso89@gmail.com', 'dasdasdasdas sadasdas', 3, 'No');

-- --------------------------------------------------------

--
-- Table structure for table `feedback_archived`
--

CREATE TABLE `feedback_archived` (
  `FeedbackID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Star_Rating` int(11) NOT NULL,
  `AdminResponded` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_archived`
--

INSERT INTO `feedback_archived` (`FeedbackID`, `Email`, `Description`, `Star_Rating`, `AdminResponded`) VALUES
(3, 'rionhermoso89@gmail.com', 'try', 3, 'No'),
(4, 'rionhermoso89@gmail.com', 'try', 3, 'No'),
(5, 'rionhermoso89@gmail.com', 'try', 3, 'No'),
(6, 'rionhermoso89@gmail.com', 'try', 3, 'No');

-- --------------------------------------------------------

--
-- Table structure for table `handbook`
--

CREATE TABLE `handbook` (
  `handbookID` int(11) NOT NULL,
  `subject_title` varchar(60) DEFAULT NULL,
  `subject_description` varchar(150) DEFAULT NULL,
  `img_header_url` varchar(500) DEFAULT NULL,
  `content_title` varchar(200) DEFAULT NULL,
  `content_description` varchar(200) DEFAULT NULL,
  `content_img_url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `handbook`
--

INSERT INTO `handbook` (`handbookID`, `subject_title`, `subject_description`, `img_header_url`, `content_title`, `content_description`, `content_img_url`) VALUES
(2, 'Hand Sign', 'Learn hand signs', NULL, 'Hello World', 'Testing\n', NULL),
(5, 'Hand', 'Test', NULL, 'Enter ', NULL, NULL),
(6, 'Test', 'Test', NULL, 'Enter Title', 'Enter Descriptio', NULL),
(7, 'Test', 'Testing', '/home/noob212/Documents/Computer Science/Website/Sign Language/Sign Language-Backend/uploads/Firefox_wallpaper.png', 'TitleSample', 'This is a Sample Pag', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `handbook_contents`
--

CREATE TABLE `handbook_contents` (
  `handbookID` int(11) DEFAULT NULL,
  `signlanguageID` int(11) DEFAULT NULL,
  `contentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `handbook_contents`
--

INSERT INTO `handbook_contents` (`handbookID`, `signlanguageID`, `contentID`) VALUES
(7, 1, 1),
(2, 13, 5),
(2, 15, 7),
(2, 16, 8),
(2, 17, 9);

-- --------------------------------------------------------

--
-- Table structure for table `handbook_contents_view`
--

CREATE TABLE `handbook_contents_view` (
  `handbookID` int(11) DEFAULT NULL,
  `signlanguageID` int(11) DEFAULT NULL,
  `contentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `handbook_view`
--

CREATE TABLE `handbook_view` (
  `handbookID` int(11) NOT NULL,
  `subject_title` varchar(60) DEFAULT NULL,
  `subject_description` varchar(150) DEFAULT NULL,
  `img_header_url` varchar(500) DEFAULT NULL,
  `content_title` varchar(200) DEFAULT NULL,
  `content_description` varchar(200) DEFAULT NULL,
  `content_img_url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `requestID` int(11) NOT NULL,
  `handbookID` int(11) DEFAULT NULL,
  `status` enum('pending','rejected','approved') DEFAULT NULL,
  `submitted_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `accountID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`requestID`, `handbookID`, `status`, `submitted_on`, `accountID`) VALUES
(1, 2, 'pending', '2024-05-22 08:02:36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `testID` int(11) NOT NULL,
  `test_subject` varchar(60) DEFAULT NULL,
  `test_description` varchar(150) DEFAULT NULL,
  `test_title` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`testID`, `test_subject`, `test_description`, `test_title`) VALUES
(1, 'Test Creation', 'I am creating a test for testing reasons', 'Creating Test'),
(2, 'laway ni jordi', 'baby baby baby ohh, baby baby baby no!', 'snickers '),
(3, 'third', 'third', 'third');

-- --------------------------------------------------------

--
-- Table structure for table `test_qa`
--

CREATE TABLE `test_qa` (
  `testID` int(11) NOT NULL,
  `question` varchar(500) DEFAULT NULL,
  `correct_ans` varchar(150) DEFAULT NULL,
  `incorrect1` varchar(150) DEFAULT NULL,
  `incorrect2` varchar(150) DEFAULT NULL,
  `incorrect3` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_qa`
--

INSERT INTO `test_qa` (`testID`, `question`, `correct_ans`, `incorrect1`, `incorrect2`, `incorrect3`) VALUES
(1, 'am I testing?', 'yes', 'no', 'maybe', 'dorya'),
(1, '-> * \\> /^ ', 'dorya', 'hell sweep', 'excellent', 'black flash'),
(2, 'sino kumagat ng snickers pagkatapos ni jords', 'aubrey', 'welson', 'ormin', 'rion'),
(3, 'third', 'third', 'third', 'third', 'third');

-- --------------------------------------------------------

--
-- Table structure for table `test_results`
--

CREATE TABLE `test_results` (
  `resultID` int(11) NOT NULL,
  `accountID` int(11) DEFAULT NULL,
  `testID` int(11) DEFAULT NULL,
  `test_scores` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_results`
--

INSERT INTO `test_results` (`resultID`, `accountID`, `testID`, `test_scores`) VALUES
(1, 13, 1, '50'),
(2, 13, 2, '100'),
(3, 13, 1, '50'),
(4, 13, 1, '0'),
(5, 13, 1, '50'),
(6, 13, 1, '0'),
(7, 13, 1, '50'),
(8, 13, 1, '50'),
(9, 13, 1, '0'),
(10, 13, 1, '0'),
(11, 13, 1, '0'),
(12, 10, 1, '0'),
(13, 10, 1, '0'),
(14, 10, 1, '0'),
(15, 13, 1, '100'),
(16, 6, 1, '0'),
(17, 6, 1, '100'),
(18, 18, 1, '100');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`accountID`);

--
-- Indexes for table `accounts_archived`
--
ALTER TABLE `accounts_archived`
  ADD PRIMARY KEY (`accountID`);

--
-- Indexes for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD PRIMARY KEY (`signlanguageID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`FeedbackID`);

--
-- Indexes for table `feedback_archived`
--
ALTER TABLE `feedback_archived`
  ADD PRIMARY KEY (`FeedbackID`);

--
-- Indexes for table `handbook`
--
ALTER TABLE `handbook`
  ADD PRIMARY KEY (`handbookID`);

--
-- Indexes for table `handbook_contents`
--
ALTER TABLE `handbook_contents`
  ADD PRIMARY KEY (`contentID`),
  ADD KEY `handbookID` (`handbookID`),
  ADD KEY `signlanguageID` (`signlanguageID`);

--
-- Indexes for table `handbook_contents_view`
--
ALTER TABLE `handbook_contents_view`
  ADD PRIMARY KEY (`contentID`);

--
-- Indexes for table `handbook_view`
--
ALTER TABLE `handbook_view`
  ADD PRIMARY KEY (`handbookID`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`requestID`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`testID`);

--
-- Indexes for table `test_results`
--
ALTER TABLE `test_results`
  ADD PRIMARY KEY (`resultID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `accounts_archived`
--
ALTER TABLE `accounts_archived`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dictionary`
--
ALTER TABLE `dictionary`
  MODIFY `signlanguageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `FeedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `feedback_archived`
--
ALTER TABLE `feedback_archived`
  MODIFY `FeedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `handbook`
--
ALTER TABLE `handbook`
  MODIFY `handbookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `handbook_contents`
--
ALTER TABLE `handbook_contents`
  MODIFY `contentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `handbook_contents_view`
--
ALTER TABLE `handbook_contents_view`
  MODIFY `contentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `handbook_view`
--
ALTER TABLE `handbook_view`
  MODIFY `handbookID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `testID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `test_results`
--
ALTER TABLE `test_results`
  MODIFY `resultID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `handbook_contents`
--
ALTER TABLE `handbook_contents`
  ADD CONSTRAINT `handbook_contents_ibfk_1` FOREIGN KEY (`handbookID`) REFERENCES `handbook` (`handbookID`),
  ADD CONSTRAINT `handbook_contents_ibfk_2` FOREIGN KEY (`signlanguageID`) REFERENCES `dictionary` (`signlanguageID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
