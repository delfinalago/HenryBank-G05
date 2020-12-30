-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-12-2020 a las 01:14:11
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veski`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` int(8) NOT NULL,
  `id_client` int(8) NOT NULL,
  `associateacount` int(60) DEFAULT NULL,
  `cvu` varchar(22) DEFAULT NULL,
  `code` varchar(10) NOT NULL,
  `balance` int(60) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `id_client`, `associateacount`, `cvu`, `code`, `balance`) VALUES
(1, 3, NULL, NULL, 'e3b0c44298', 0),
(2, 4, NULL, NULL, 'e3b0c44298', 0),
(3, 5, NULL, NULL, 'e3b0c44298', 0),
(4, 6, NULL, NULL, 'e3b0c44298', 0),
(5, 7, NULL, NULL, 'e3b0c44298', 0),
(6, 8, NULL, NULL, 'e3b0c44298', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `cardtype` varchar(50) NOT NULL,
  `bankname` varchar(60) NOT NULL,
  `number` int(15) NOT NULL,
  `securitycode` int(8) DEFAULT NULL,
  `expirationdate` date NOT NULL,
  `id_acc` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `birthdate` date NOT NULL,
  `cellphone` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `street` varchar(60) NOT NULL,
  `city` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`id`, `username`, `password`, `first_name`, `last_name`, `birthdate`, `cellphone`, `dni`, `street`, `city`) VALUES
(2, 'tuvieja@admin.com', '$2b$10$iYSXgoJTk/h42ePKG.snfeLR88dhbS3g6wD1z7cVYilJn97ImMori', 'Franco', 'Etcheverri', '1998-07-19', 1536835976, 41471321, 'Santa Fe 4515', 'caba'),
(3, 'tuvieja@admin.com', '$2b$10$21XCeSRWdtgbsRLUtuxBv.B77A/ZsiE/r0AF64IR7BIUZTpE3npSq', 'Franco', 'Etcheverri', '1998-07-19', 1536835976, 41471320, 'Santa Fe 4515', 'caba'),
(4, 'santiagolopezcane@gmail.com', '$2b$10$e1WqwZrkJMVHHAGWY10uPu4HG4ybIkBRdkn1fKBOA/oEcNM0u9qe.', 'santiago', 'lopez cane', '0000-00-00', 1536835976, 41471665, 'santa fe 4515', 'caba'),
(5, 'lires.matiash@gmail.com', '$2b$10$XeP8VReP/gasT.kXVGiAhu6TtWanDK7RKm3IN4sI/8pk0khaam05G', 'matias', 'lires', '1996-08-08', 152245477, 39852111, 'Aguero 1222', 'caba'),
(6, 'camilaff94@gmail.com', '$2b$10$BbBzyj8bOJjdijMWOFpAb.r4DrF9vFguPLdLuG4t04ewYfAapgH.q', 'Camila', 'Fernandez', '1995-10-10', 1566666666, 38123210, 'Callao 100', 'caba'),
(7, 'nahuelmartinc@gmail.com', '$2b$10$75A9cUvm8X5tMchE9GIf/.irq35Pba0utcVzL7LqW4A9/7V5R4CTy', 'Nahuel', 'Caputto', '1992-03-03', 1598989898, 36323232, 'Peron 200', 'caba'),
(8, 'delfinalago@gmail.com', '$2b$10$LD0E4pER2X9yGVRdP27P9.jflHcVUERBBvpxZTQeMW3FKApBrNu2S', 'Delfina', 'Lago', '1995-05-18', 1543434343, 38545454, 'ciudad de la paz 1200', 'caba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(8) NOT NULL,
  `id_contact` int(60) NOT NULL,
  `alias` varchar(60) NOT NULL,
  `id_cli` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `id_contact`, `alias`, `id_cli`) VALUES
(1, 8, 'Delfi Henry', 4),
(2, 7, 'La Nona', 4),
(3, 2, 'Tu Madre', 4),
(4, 5, 'Mati', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `id` int(60) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `description` varchar(60) DEFAULT NULL,
  `amount` int(60) NOT NULL,
  `origin` int(60) NOT NULL,
  `destiny` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD UNIQUE KEY `id_client` (`id_client`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_acc` (`id_acc`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_contact` (`id_contact`,`id_cli`),
  ADD KEY `cli-cli` (`id_cli`);

--
-- Indices de la tabla `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `origin` (`origin`,`destiny`),
  ADD KEY `acc-transd` (`destiny`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(60) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `user-cuent` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`);

--
-- Filtros para la tabla `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `tarj - cuenta` FOREIGN KEY (`id_acc`) REFERENCES `accounts` (`id`);

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `cont-cli` FOREIGN KEY (`id_contact`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `cont-cont` FOREIGN KEY (`id_cli`) REFERENCES `client` (`id`);

--
-- Filtros para la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `acc-trans` FOREIGN KEY (`origin`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `acc-transd` FOREIGN KEY (`destiny`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
