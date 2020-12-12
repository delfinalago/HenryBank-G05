-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2020 a las 04:55:28
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
  `numClient` int(8) NOT NULL,
  `id_client` int(8) NOT NULL,
  `associateacount` int(60) NOT NULL,
  `cvu` int(11) NOT NULL,
  `balance` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `numClient`, `id_client`, `associateacount`, `cvu`, `balance`) VALUES
(1, 1, 1, 12345678, 2147483647, 100000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cards`
--

CREATE TABLE `cards` (
  `id` int(8) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `cardtype` varchar(50) NOT NULL,
  `bankname` varchar(60) NOT NULL,
  `number` int(15) NOT NULL,
  `securitycode` int(8) DEFAULT NULL,
  `expirationdate` date NOT NULL,
  `id_acc` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cards`
--

INSERT INTO `cards` (`id`, `first_name`, `last_name`, `cardtype`, `bankname`, `number`, `securitycode`, `expirationdate`, `id_acc`) VALUES
(1, 'veski', 'veski', '', '', 0, NULL, '0000-00-00', 0),
(1, 'a', 'a', 'a', 'a', 123456789, NULL, '2020-12-01', 1);

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
  `tipo_doc` varchar(60) NOT NULL,
  `dni` int(11) NOT NULL,
  `street` varchar(60) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(60) NOT NULL,
  `postalcode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`id`, `username`, `password`, `first_name`, `last_name`, `birthdate`, `cellphone`, `tipo_doc`, `dni`, `street`, `province`, `city`, `postalcode`) VALUES
(1, 'usernameveski', '1', 'veski', 'veski', '2020-12-01', 123, '123', 1, 'avenida siempreviva', 'bsas', 'argentina', 1234);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `id` int(60) NOT NULL,
  `state` int(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `description` varchar(60) NOT NULL,
  `amount` int(60) NOT NULL,
  `origin` int(60) NOT NULL,
  `destiny` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `transactions`
--

INSERT INTO `transactions` (`id`, `state`, `type`, `description`, `amount`, `origin`, `destiny`) VALUES
(1, 1, 'a', 'a', 1, 1, 1);

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
  ADD PRIMARY KEY (`number`),
  ADD UNIQUE KEY `id_acc` (`id_acc`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD UNIQUE KEY `id_contact` (`id_contact`,`id_cli`),
  ADD KEY `cli-cli` (`id_cli`);

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
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `acc-tarj` FOREIGN KEY (`id`) REFERENCES `cards` (`id_acc`),
  ADD CONSTRAINT `acc-trans` FOREIGN KEY (`id`) REFERENCES `transactions` (`origin`);

--
-- Filtros para la tabla `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `cli-acc` FOREIGN KEY (`id`) REFERENCES `accounts` (`id_client`);

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `cli-cli` FOREIGN KEY (`id_cli`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `cont-cli` FOREIGN KEY (`id_contact`) REFERENCES `client` (`id`);

--
-- Filtros para la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `acc-transd` FOREIGN KEY (`destiny`) REFERENCES `transactions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
