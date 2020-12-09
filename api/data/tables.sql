-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2020 a las 18:21:51
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
-- Estructura de tabla para la tabla `account`
--

CREATE TABLE `accounts` (
  `id_acc` int(60) NOT NULL,
  `associateacount` int(60) NOT NULL,
  `cbu` int(60) NOT NULL,
  `summary` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `address`
--

CREATE TABLE `addresses` (
  `id_add` int(60) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `street` varchar(60) NOT NULL,
  `postalCode` int(60) NOT NULL,
  `province` varchar(60) NOT NULL,
  `city` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `cards` (
  `id_card` int(60) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `cardname` varchar(60) NOT NULL,
  `bankname` varchar(60) NOT NULL,
  `number` int(60) NOT NULL,
  `securitycode` varchar(60) NOT NULL,
  `expirationdate` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact`
--

CREATE TABLE `contacts` (
  `id_contact` int(60) NOT NULL,
  `username` varchar(60) NOT NULL,
  `numberphone` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaction`
--

CREATE TABLE `transactions` (
  `id_tr` int(60) NOT NULL,
  `state` int(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `description` varchar(60) NOT NULL,
  `amount` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `users` (
  `id_user` int(60) NOT NULL,
  `username` varchar(60) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `id_add` int(60) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `account`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`cbu`);

--
-- Indices de la tabla `card`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`number`);

--
-- Indices de la tabla `contact`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id_contact`);

--
-- Indices de la tabla `transaction`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id_tr`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_add`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `account`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`cbu`) REFERENCES `users` (`id_add`);

--
-- Filtros para la tabla `card`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`number`) REFERENCES `accounts` (`cbu`);

--
-- Filtros para la tabla `contact`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`id_contact`) REFERENCES `users` (`id_add`);

--
-- Filtros para la tabla `transaction`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_tr`) REFERENCES `accounts` (`cbu`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_add`) REFERENCES `addresses` (`id_add`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
