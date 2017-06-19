/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : node

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2017-06-19 09:56:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
