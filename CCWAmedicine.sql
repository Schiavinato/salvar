-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 25-Out-2023 às 08:15
-- Versão do servidor: 8.0.34-0ubuntu0.22.04.1
-- versão do PHP: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `CCWAmedicine`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastro`
--

CREATE TABLE `cadastro` (
  `user_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `CEP` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `cadastro`
--

INSERT INTO `cadastro` (`user_id`, `username`, `password`, `cpf`, `telefone`, `email`, `sexo`, `CEP`) VALUES
(1, 'dgfgf', '1212', '', '', '', '', ''),
(2, 'cas', 'caca', '', '', '', '', ''),
(3, 'wellington', 'jesus', '', '', '', '', ''),
(4, 'caioba', '1010', '', '', '', '', ''),
(5, 'caki', '1010', '', '', '', '', ''),
(6, 'caike.caio', '123', '', '', '', '', ''),
(7, 'caike.caio', '123', '', '', '', '', ''),
(8, 'caike.caio', '', '', '', '', '', ''),
(9, 'teste', '123', '222.222.222-22', '222222222', 'caik@gmail.com', 'masculino', '12345-678'),
(10, 'eduardo', 'pimen', '123.567.999-33', '199888888', 'pimen@gmail.com', 'masculino', '12345-786');

-- --------------------------------------------------------

--
-- Estrutura da tabela `consultas`
--

CREATE TABLE `consultas` (
  `id` int NOT NULL,
  `nome_paciente` varchar(255) NOT NULL,
  `data_consulta` date NOT NULL,
  `hora_consulta` time NOT NULL,
  `observacoes` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `consultas`
--

INSERT INTO `consultas` (`id`, `nome_paciente`, `data_consulta`, `hora_consulta`, `observacoes`, `criado_em`) VALUES
(1, 'caike', '2023-10-03', '20:57:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

CREATE TABLE `login` (
  `login_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `login`
--

INSERT INTO `login` (`login_id`, `user_id`, `last_login`) VALUES
(1, 1, '2023-10-18 08:19:43'),
(2, 2, '2023-10-18 08:20:09'),
(3, 3, '2023-10-20 07:49:40'),
(4, 4, '2023-10-20 07:53:53'),
(5, 5, '2023-10-20 08:17:41'),
(6, 6, '2023-10-20 08:27:45'),
(7, 7, '2023-10-20 08:32:37'),
(8, 8, '2023-10-20 08:32:50'),
(9, 9, '2023-10-20 09:46:45'),
(10, 10, '2023-10-20 09:51:48');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cadastro`
--
ALTER TABLE `cadastro`
  ADD PRIMARY KEY (`user_id`);

--
-- Índices para tabela `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastro`
--
ALTER TABLE `cadastro`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `cadastro` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
