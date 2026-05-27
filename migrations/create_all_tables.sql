-- ============================================================
-- FILE: create_all_tables.sql
-- DESCRIPTION: Full migration for all tables in Tembi Web
-- ENGINE: InnoDB, CHARSET: utf8mb4
-- Generated from API route analysis
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- TABLE: users
-- Source: /app/api/auth/login/route.ts (db-laravel)
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255) NOT NULL,
    `email`      VARCHAR(255) NOT NULL UNIQUE,
    `password`   VARCHAR(255) NOT NULL,
    `role_id`    INT(11)      NOT NULL DEFAULT 2,
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_email` (`email`),
    INDEX `idx_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: blogs
-- Source: /app/api/admin/blogs/route.ts
-- INSERT: id, title_ind, title_eng, description_ind, description_eng, thumbnail, slug, created_by, created_at
-- SELECT: id, title_ind, title_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `blogs` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `title_ind`       VARCHAR(255) NOT NULL,
    `title_eng`       VARCHAR(255) NOT NULL,
    `description_ind` LONGTEXT     NOT NULL,
    `description_eng` LONGTEXT     NOT NULL,
    `thumbnail`       VARCHAR(500) NOT NULL,
    `slug`            VARCHAR(255) NOT NULL UNIQUE,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: carousels
-- Source: /app/api/admin/carousel/route.ts
-- INSERT: image, title_ind, title_eng, is_active, created_by, created_at
-- SELECT: id, image, title_ind, title_eng, is_active, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `carousels` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `image`      VARCHAR(500) NOT NULL,
    `title_ind`  VARCHAR(255) NOT NULL,
    `title_eng`  VARCHAR(255) NOT NULL,
    `is_active`  TINYINT(1)   NOT NULL DEFAULT 1,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: celebrate_moment
-- Source: /app/api/admin/celebrate/route.ts
-- INSERT: name_ind, name_eng, description_ind, description_eng, image, created_by, created_at
-- SELECT: id, name_ind, name_eng, description_ind, description_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `celebrate_moment` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`        VARCHAR(255) NOT NULL,
    `name_eng`        VARCHAR(255) NOT NULL,
    `description_ind` TEXT         NOT NULL,
    `description_eng` TEXT         NOT NULL,
    `image`           VARCHAR(500) NOT NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: celebrate_moment_list
-- Source: /app/api/admin/celebrate/route.ts
-- INSERT: celebrate_moment_id, name_ind, name_eng, created_by, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `celebrate_moment_list` (
    `id`                  INT(11)      NOT NULL AUTO_INCREMENT,
    `celebrate_moment_id` INT(11)      NOT NULL,
    `name_ind`            VARCHAR(255) NOT NULL,
    `name_eng`            VARCHAR(255) NOT NULL,
    `created_by`          VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`          VARCHAR(100) NULL,
    `updated_at`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_celebrate_moment_id` (`celebrate_moment_id`),
    CONSTRAINT `fk_celebrate_moment_list_moment`
        FOREIGN KEY (`celebrate_moment_id`) REFERENCES `celebrate_moment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_collection
-- Source: /app/api/admin/collections/master/route.ts
-- INSERT: name_ind, name_eng, created_by, created_at
-- SELECT: id, name_ind, name_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_collection` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`   VARCHAR(255) NOT NULL,
    `name_eng`   VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: collection
-- Source: /app/api/admin/collections/main/route.ts
-- INSERT: mstr_collection_id, name_ind, name_eng, description_ind, description_eng, image, created_by, created_at
-- SELECT: collection.id, collection.name_ind, collection.name_eng, mstr_collection.name_ind as mstr_collection_name
-- ============================================================
CREATE TABLE IF NOT EXISTS `collection` (
    `id`                  INT(11)      NOT NULL AUTO_INCREMENT,
    `mstr_collection_id`  INT(11)      NOT NULL,
    `name_ind`            VARCHAR(255) NOT NULL,
    `name_eng`            VARCHAR(255) NOT NULL,
    `description_ind`     TEXT         NOT NULL,
    `description_eng`     TEXT         NOT NULL,
    `image`               VARCHAR(500) NOT NULL,
    `created_by`          VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`          VARCHAR(100) NULL,
    `updated_at`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_mstr_collection_id` (`mstr_collection_id`),
    CONSTRAINT `fk_collection_mstr_collection`
        FOREIGN KEY (`mstr_collection_id`) REFERENCES `mstr_collection` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: event
-- Source: /app/api/admin/event/route.ts
-- INSERT: title_ind, title_eng, description_ind, description_eng, thumbnail, slug,
--         created_by, created_at, hosted_by, date_event, time_event
-- SELECT: id, title_ind, title_eng
-- Note: description_ind/eng may contain HTML with embedded base64 images => LONGTEXT
-- ============================================================
CREATE TABLE IF NOT EXISTS `event` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `title_ind`       VARCHAR(255) NOT NULL,
    `title_eng`       VARCHAR(255) NOT NULL,
    `description_ind` LONGTEXT     NOT NULL,
    `description_eng` LONGTEXT     NOT NULL,
    `thumbnail`       VARCHAR(500) NOT NULL,
    `slug`            VARCHAR(255) NOT NULL UNIQUE,
    `hosted_by`       VARCHAR(255) NOT NULL,
    `date_event`      DATE         NOT NULL,
    `time_event`      VARCHAR(100) NOT NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_slug` (`slug`),
    INDEX `idx_date_event` (`date_event`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_type_catering_service
-- Source: /app/api/admin/food/catering/route.ts (JOIN reference)
--         /app/api/admin/rooms/master/type-catering-service/options/route.ts
-- SELECT: id AS value, name_ind AS label, name_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_type_catering_service` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`   VARCHAR(255) NOT NULL,
    `name_eng`   VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: food_packages
-- Source: /app/api/admin/food/catering/route.ts
-- INSERT: type_catering_service_id, name_ind, name_eng, description_ind, description_eng,
--         minimum_pax, hours_service_min, hours_service_max, title_menu_ind, title_menu_eng,
--         description_menu_ind, description_menu_eng, description_card_ind, description_card_eng,
--         slug, created_by, created_at, subtitle_menu_ind, subtitle_menu_eng, image
-- SELECT: food_packages.id, name_ind, name_eng, minimum_pax, hours_service_min, hours_service_max,
--         mstr_type_catering_service.name_eng AS type_catering_service
-- ============================================================
CREATE TABLE IF NOT EXISTS `food_packages` (
    `id`                      INT(11)      NOT NULL AUTO_INCREMENT,
    `type_catering_service_id` INT(11)     NOT NULL,
    `name_ind`                VARCHAR(255) NOT NULL,
    `name_eng`                VARCHAR(255) NOT NULL,
    `description_ind`         TEXT         NOT NULL,
    `description_eng`         TEXT         NOT NULL,
    `minimum_pax`             INT(11)      NOT NULL DEFAULT 1,
    `hours_service_min`       INT(11)      NOT NULL DEFAULT 0,
    `hours_service_max`       INT(11)      NOT NULL DEFAULT 0,
    `title_menu_ind`          VARCHAR(255) NOT NULL,
    `title_menu_eng`          VARCHAR(255) NOT NULL,
    `description_menu_ind`    TEXT         NOT NULL,
    `description_menu_eng`    TEXT         NOT NULL,
    `description_card_ind`    TEXT         NOT NULL,
    `description_card_eng`    TEXT         NOT NULL,
    `subtitle_menu_ind`       VARCHAR(255) NULL DEFAULT '',
    `subtitle_menu_eng`       VARCHAR(255) NULL DEFAULT '',
    `image`                   VARCHAR(500) NOT NULL,
    `slug`                    VARCHAR(255) NOT NULL UNIQUE,
    `created_by`              VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`              TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`              VARCHAR(100) NULL,
    `updated_at`              TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_slug` (`slug`),
    INDEX `idx_type_catering_service_id` (`type_catering_service_id`),
    CONSTRAINT `fk_food_packages_catering_service`
        FOREIGN KEY (`type_catering_service_id`) REFERENCES `mstr_type_catering_service` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: food_packages_primary
-- Source: /app/api/admin/food/catering/route.ts
-- INSERT: food_packages_id, name_ind, name_eng, created_by, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `food_packages_primary` (
    `id`               INT(11)      NOT NULL AUTO_INCREMENT,
    `food_packages_id` INT(11)      NOT NULL,
    `name_ind`         VARCHAR(255) NOT NULL,
    `name_eng`         VARCHAR(255) NOT NULL,
    `created_by`       VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`       VARCHAR(100) NULL,
    `updated_at`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_food_packages_id` (`food_packages_id`),
    CONSTRAINT `fk_food_packages_primary_package`
        FOREIGN KEY (`food_packages_id`) REFERENCES `food_packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: our_menu
-- Source: /app/api/admin/food/menu/route.ts
-- INSERT: food_package_id, name_ind, name_eng, subname_ind, subname_eng, icon, created_by, created_at
-- SELECT: our_menu.id, name_ind, name_eng, icon, subname_ind, subname_eng,
--         food_packages.name_ind AS catering_name
-- ============================================================
CREATE TABLE IF NOT EXISTS `our_menu` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `food_package_id` INT(11)      NOT NULL,
    `name_ind`        VARCHAR(255) NOT NULL,
    `name_eng`        VARCHAR(255) NOT NULL,
    `subname_ind`     VARCHAR(255) NOT NULL,
    `subname_eng`     VARCHAR(255) NOT NULL,
    `icon`            VARCHAR(255) NOT NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_food_package_id` (`food_package_id`),
    CONSTRAINT `fk_our_menu_food_package`
        FOREIGN KEY (`food_package_id`) REFERENCES `food_packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: our_menu_food
-- Source: /app/api/admin/food/menu/route.ts
-- INSERT: our_menu_id, name_ind, name_eng, created_by, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `our_menu_food` (
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `our_menu_id` INT(11)      NOT NULL,
    `name_ind`    VARCHAR(255) NOT NULL,
    `name_eng`    VARCHAR(255) NOT NULL,
    `created_by`  VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`  VARCHAR(100) NULL,
    `updated_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_our_menu_id` (`our_menu_id`),
    CONSTRAINT `fk_our_menu_food_menu`
        FOREIGN KEY (`our_menu_id`) REFERENCES `our_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: our_menu_highlight
-- Source: /app/api/admin/food/highlight/route.ts
-- INSERT: food_package_id, our_menu_food_id, image, description_ind, description_eng, created_by, created_at
-- SELECT: our_menu_highlight.id, food_packages.name_ind as package_name,
--         our_menu_food.name_ind as food_name, our_menu_highlight.description_ind
-- ============================================================
CREATE TABLE IF NOT EXISTS `our_menu_highlight` (
    `id`               INT(11)      NOT NULL AUTO_INCREMENT,
    `food_package_id`  INT(11)      NOT NULL,
    `our_menu_food_id` INT(11)      NOT NULL,
    `image`            VARCHAR(500) NOT NULL,
    `description_ind`  TEXT         NOT NULL,
    `description_eng`  TEXT         NOT NULL,
    `created_by`       VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`       VARCHAR(100) NULL,
    `updated_at`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_food_package_id` (`food_package_id`),
    INDEX `idx_our_menu_food_id` (`our_menu_food_id`),
    CONSTRAINT `fk_our_menu_highlight_package`
        FOREIGN KEY (`food_package_id`) REFERENCES `food_packages` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_our_menu_highlight_food`
        FOREIGN KEY (`our_menu_food_id`) REFERENCES `our_menu_food` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: our_menu_package
-- Source: /app/api/admin/food/package/route.ts
-- INSERT: food_package_id, name_ind, name_eng, description_ind, description_eng,
--         icon, minimum_guest, is_popular, color, created_by, created_at
-- SELECT: our_menu_package.id, name_ind, name_eng, icon, minimum_guest, is_popular,
--         food_packages.name_ind as package_name
-- ============================================================
CREATE TABLE IF NOT EXISTS `our_menu_package` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `food_package_id` INT(11)      NOT NULL,
    `name_ind`        VARCHAR(255) NOT NULL,
    `name_eng`        VARCHAR(255) NOT NULL,
    `description_ind` TEXT         NOT NULL,
    `description_eng` TEXT         NOT NULL,
    `icon`            VARCHAR(255) NOT NULL,
    `minimum_guest`   INT(11)      NOT NULL DEFAULT 1,
    `is_popular`      TINYINT(1)   NOT NULL DEFAULT 0,
    `color`           VARCHAR(50)  NOT NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_food_package_id` (`food_package_id`),
    INDEX `idx_is_popular` (`is_popular`),
    CONSTRAINT `fk_our_menu_package_food_package`
        FOREIGN KEY (`food_package_id`) REFERENCES `food_packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: package_include
-- Source: /app/api/admin/food/package/route.ts
-- INSERT: our_menu_package_id, name_ind, name_eng, created_by, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `package_include` (
    `id`                  INT(11)      NOT NULL AUTO_INCREMENT,
    `our_menu_package_id` INT(11)      NOT NULL,
    `name_ind`            VARCHAR(255) NOT NULL,
    `name_eng`            VARCHAR(255) NOT NULL,
    `created_by`          VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`          VARCHAR(100) NULL,
    `updated_at`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_our_menu_package_id` (`our_menu_package_id`),
    CONSTRAINT `fk_package_include_our_menu_package`
        FOREIGN KEY (`our_menu_package_id`) REFERENCES `our_menu_package` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_mattress_room
-- Source: /app/api/admin/rooms/master/mattress/route.ts
-- INSERT: name, created_by, created_at
-- SELECT: id, name
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_mattress_room` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_tiers_room
-- Source: /app/api/admin/rooms/master/tiers/route.ts
-- INSERT: name_id, created_by, created_at
-- SELECT: id, name_id
-- Also uses: name_id AS tiers_name in room JOIN
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_tiers_room` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name_id`    VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_fasilities
-- Source: /app/api/admin/rooms/master/fasilities/route.ts
-- INSERT: name_ind, name_eng, icon, created_by, created_at
-- SELECT: id, name_ind, name_eng, icon
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_fasilities` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`   VARCHAR(255) NOT NULL,
    `name_eng`   VARCHAR(255) NOT NULL,
    `icon`       VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_house_rules
-- Source: /app/api/admin/rooms/master/homerules/route.ts
-- INSERT: name_ind, name_eng, icon, created_by, created_at
-- SELECT: id, name_ind, name_eng, icon
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_house_rules` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`   VARCHAR(255) NOT NULL,
    `name_eng`   VARCHAR(255) NOT NULL,
    `icon`       VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_room_policies
-- Source: /app/api/admin/rooms/master/policies/route.ts
-- INSERT: name_ind, name_eng, icon, type, created_by, created_at
-- SELECT: id, name_ind, name_eng, icon, type
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_room_policies` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`   VARCHAR(255) NOT NULL,
    `name_eng`   VARCHAR(255) NOT NULL,
    `icon`       VARCHAR(255) NOT NULL,
    `type`       VARCHAR(100) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_services
-- Source: /app/api/admin/rooms/amenties/route.ts
-- INSERT: name_ind, name_eng, icon, is_addition, created_by, created_at
-- SELECT: id, name_ind, name_eng, icon, is_addition
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_services` (
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`    VARCHAR(255) NOT NULL,
    `name_eng`    VARCHAR(255) NOT NULL,
    `icon`        VARCHAR(255) NOT NULL,
    `is_addition` TINYINT(1)   NOT NULL DEFAULT 0,
    `created_by`  VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`  VARCHAR(100) NULL,
    `updated_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: amenities_services
-- Source: /app/api/admin/rooms/amenties/route.ts
-- INSERT: services_id, name_ind, name_eng, created_by, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `amenities_services` (
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `services_id` INT(11)      NOT NULL,
    `name_ind`    VARCHAR(255) NOT NULL,
    `name_eng`    VARCHAR(255) NOT NULL,
    `created_by`  VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`  VARCHAR(100) NULL,
    `updated_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_services_id` (`services_id`),
    CONSTRAINT `fk_amenities_services_service`
        FOREIGN KEY (`services_id`) REFERENCES `mstr_services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: room
-- Source: /app/api/admin/rooms/main/route.ts
-- INSERT: title_ind, title_eng, subtitle_ind, subtitle_eng, description_ind, description_eng,
--         matters_id, number_guest, spacious_room, room_price, slug, is_recomendation,
--         created_by, created_at, updated_at, tiers_id
-- SELECT: r.id, r.title_ind, r.title_eng, r.room_price, r.number_guest, r.is_recomendation,
--         m.name AS mattress_name, t.name_id AS tiers_name
-- ============================================================
CREATE TABLE IF NOT EXISTS `room` (
    `id`              INT(11)        NOT NULL AUTO_INCREMENT,
    `title_ind`       VARCHAR(255)   NOT NULL,
    `title_eng`       VARCHAR(255)   NOT NULL,
    `subtitle_ind`    VARCHAR(255)   NOT NULL,
    `subtitle_eng`    VARCHAR(255)   NOT NULL,
    `description_ind` LONGTEXT       NOT NULL,
    `description_eng` LONGTEXT       NOT NULL,
    `matters_id`      INT(11)        NOT NULL,
    `tiers_id`        INT(11)        NOT NULL,
    `number_guest`    INT(11)        NOT NULL DEFAULT 1,
    `spacious_room`   DECIMAL(10,2)  NOT NULL DEFAULT 0.00,
    `room_price`      INT(11)        NOT NULL DEFAULT 0,
    `slug`            VARCHAR(255)   NOT NULL UNIQUE,
    `is_recomendation` TINYINT(1)   NOT NULL DEFAULT 0,
    `created_by`      VARCHAR(100)   NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP      NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100)   NULL,
    `updated_at`      TIMESTAMP      NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_slug` (`slug`),
    INDEX `idx_matters_id` (`matters_id`),
    INDEX `idx_tiers_id` (`tiers_id`),
    INDEX `idx_is_recomendation` (`is_recomendation`),
    CONSTRAINT `fk_room_mattress`
        FOREIGN KEY (`matters_id`) REFERENCES `mstr_mattress_room` (`id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_room_tiers`
        FOREIGN KEY (`tiers_id`) REFERENCES `mstr_tiers_room` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: room_facilities
-- Source: /app/api/admin/rooms/main/route.ts
-- INSERT: room_id, facilities_id, created_by, created_at, updated_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `room_facilities` (
    `id`            INT(11)      NOT NULL AUTO_INCREMENT,
    `room_id`       INT(11)      NOT NULL,
    `facilities_id` INT(11)      NOT NULL,
    `created_by`    VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`    TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_room_id` (`room_id`),
    INDEX `idx_facilities_id` (`facilities_id`),
    CONSTRAINT `fk_room_facilities_room`
        FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_room_facilities_facility`
        FOREIGN KEY (`facilities_id`) REFERENCES `mstr_fasilities` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: room_gallery
-- Source: /app/api/admin/rooms/main/route.ts
-- INSERT: room_id, image, is_banner, created_by, created_at, updated_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `room_gallery` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `room_id`    INT(11)      NOT NULL,
    `image`      VARCHAR(500) NOT NULL,
    `is_banner`  TINYINT(1)   NOT NULL DEFAULT 0,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_room_id` (`room_id`),
    INDEX `idx_is_banner` (`is_banner`),
    CONSTRAINT `fk_room_gallery_room`
        FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: room_policies
-- Source: /app/api/admin/rooms/main/route.ts
-- INSERT: room_id, policies_id, created_by, created_at, updated_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `room_policies` (
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `room_id`     INT(11)      NOT NULL,
    `policies_id` INT(11)      NOT NULL,
    `created_by`  VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_room_id` (`room_id`),
    INDEX `idx_policies_id` (`policies_id`),
    CONSTRAINT `fk_room_policies_room`
        FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_room_policies_policy`
        FOREIGN KEY (`policies_id`) REFERENCES `mstr_room_policies` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: room_rules
-- Source: /app/api/admin/rooms/main/route.ts
-- INSERT: room_id, house_rules_id, created_by, created_at, updated_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `room_rules` (
    `id`             INT(11)      NOT NULL AUTO_INCREMENT,
    `room_id`        INT(11)      NOT NULL,
    `house_rules_id` INT(11)      NOT NULL,
    `created_by`     VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`     TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_room_id` (`room_id`),
    INDEX `idx_house_rules_id` (`house_rules_id`),
    CONSTRAINT `fk_room_rules_room`
        FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_room_rules_house_rule`
        FOREIGN KEY (`house_rules_id`) REFERENCES `mstr_house_rules` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_page
-- Source: /app/api/admin/banner/route.ts (JOIN reference)
-- JOIN: room_page_meta.code = mstr_page.code
-- SELECT: mstr_page.name as name_page, mstr_page.code
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_page` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `code`       INT(11)      NOT NULL UNIQUE,
    `name`       VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by` VARCHAR(100) NULL,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: room_page_meta
-- Source: /app/api/admin/banner/route.ts, /app/api/admin/banner/[id]/route.ts
--         /app/api/public/master/banner/room/route.ts
-- SELECT: id, title_ind, title_eng, description_ind, description_eng,
--         subtitle_ind, subtitle_eng, image, code
-- UPDATE: title_ind, title_eng, description_ind, description_eng,
--         subtitle_ind, subtitle_eng, image, updated_by, updated_at
-- JOIN: room_page_meta.code = mstr_page.code
-- ============================================================
CREATE TABLE IF NOT EXISTS `room_page_meta` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `code`            INT(11)      NOT NULL,
    `title_ind`       VARCHAR(255) NOT NULL,
    `title_eng`       VARCHAR(255) NOT NULL,
    `description_ind` TEXT         NULL,
    `description_eng` TEXT         NULL,
    `subtitle_ind`    VARCHAR(500) NULL,
    `subtitle_eng`    VARCHAR(500) NULL,
    `image`           VARCHAR(500) NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_code` (`code`),
    CONSTRAINT `fk_room_page_meta_mstr_page`
        FOREIGN KEY (`code`) REFERENCES `mstr_page` (`code`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: mstr_vanue_facilities
-- Source: /app/api/admin/vanue/facilities/route.ts
-- INSERT: name_ind, name_eng, description_ind, description_eng, icon, created_by, created_at
-- SELECT: id, name_ind, name_eng, icon (also: description_ind, description_eng from slug route)
-- ============================================================
CREATE TABLE IF NOT EXISTS `mstr_vanue_facilities` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`        VARCHAR(255) NOT NULL,
    `name_eng`        VARCHAR(255) NOT NULL,
    `description_ind` TEXT         NULL,
    `description_eng` TEXT         NULL,
    `icon`            VARCHAR(255) NOT NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: vanue
-- Source: /app/api/admin/vanue/main/route.ts, /app/api/public/vanue/list-vanue/route.ts
-- INSERT: name_ind, name_eng, description_ind, description_eng, slug, created_by, created_at
-- SELECT: id, name_ind, name_eng, description_ind, description_eng, slug
-- UPDATE: name_ind, name_eng, description_ind, description_eng, slug, updated_by, updated_at
-- ============================================================
CREATE TABLE IF NOT EXISTS `vanue` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `name_ind`        VARCHAR(255) NOT NULL,
    `name_eng`        VARCHAR(255) NOT NULL,
    `description_ind` LONGTEXT     NOT NULL,
    `description_eng` LONGTEXT     NOT NULL,
    `slug`            VARCHAR(255) NOT NULL UNIQUE,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`      VARCHAR(100) NULL,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: vanue_facilities
-- Source: /app/api/admin/vanue/main/route.ts
-- INSERT: vanue_id, mstr_vanue_facilities, is_add_ons, created_by, created_at
-- SELECT: mstr_vanue_facilities, is_add_ons
-- Note: column name "mstr_vanue_facilities" is used as the FK column name
-- ============================================================
CREATE TABLE IF NOT EXISTS `vanue_facilities` (
    `id`                   INT(11)      NOT NULL AUTO_INCREMENT,
    `vanue_id`             INT(11)      NOT NULL,
    `mstr_vanue_facilities` INT(11)     NOT NULL,
    `is_add_ons`           TINYINT(1)   NOT NULL DEFAULT 0,
    `created_by`           VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`           TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_by`           VARCHAR(100) NULL,
    `updated_at`           TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_vanue_id` (`vanue_id`),
    INDEX `idx_mstr_vanue_facilities` (`mstr_vanue_facilities`),
    CONSTRAINT `fk_vanue_facilities_vanue`
        FOREIGN KEY (`vanue_id`) REFERENCES `vanue` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_vanue_facilities_mstr`
        FOREIGN KEY (`mstr_vanue_facilities`) REFERENCES `mstr_vanue_facilities` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: vanue_gallery
-- Source: /app/api/admin/vanue/main/route.ts, /app/api/public/vanue/list-vanue/route.ts
-- INSERT: vanue_id, image, is_banner, created_by, created_at
-- SELECT: id, image, is_banner
-- ============================================================
CREATE TABLE IF NOT EXISTS `vanue_gallery` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `vanue_id`   INT(11)      NOT NULL,
    `image`      VARCHAR(500) NOT NULL,
    `is_banner`  TINYINT(1)   NOT NULL DEFAULT 0,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_vanue_id` (`vanue_id`),
    INDEX `idx_is_banner` (`is_banner`),
    CONSTRAINT `fk_vanue_gallery_vanue`
        FOREIGN KEY (`vanue_id`) REFERENCES `vanue` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: vanue_notes
-- Source: /app/api/admin/vanue/main/route.ts, /app/api/admin/vanue/main/[id]/route.ts
-- INSERT: vanue_id, description_ind, description_eng, created_by, created_at
-- SELECT: id, description_ind, description_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `vanue_notes` (
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `vanue_id`        INT(11)      NOT NULL,
    `description_ind` TEXT         NOT NULL,
    `description_eng` TEXT         NOT NULL,
    `created_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_vanue_id` (`vanue_id`),
    CONSTRAINT `fk_vanue_notes_vanue`
        FOREIGN KEY (`vanue_id`) REFERENCES `vanue` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: vanue_services
-- Source: /app/api/admin/vanue/main/route.ts, /app/api/admin/vanue/main/[id]/route.ts
-- INSERT: vanue_id, name_service_ind, name_service_eng, description_ind, description_eng,
--         created_by, created_at
-- SELECT: id, name_service_ind, name_service_eng, description_ind, description_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `vanue_services` (
    `id`               INT(11)      NOT NULL AUTO_INCREMENT,
    `vanue_id`         INT(11)      NOT NULL,
    `name_service_ind` VARCHAR(255) NOT NULL,
    `name_service_eng` VARCHAR(255) NOT NULL,
    `description_ind`  TEXT         NOT NULL,
    `description_eng`  TEXT         NOT NULL,
    `created_by`       VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_vanue_id` (`vanue_id`),
    CONSTRAINT `fk_vanue_services_vanue`
        FOREIGN KEY (`vanue_id`) REFERENCES `vanue` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: venue_keys
-- Source: /app/api/admin/vanue/main/route.ts, /app/api/public/vanue/[slug]/route.ts
-- INSERT: vanue_id, icon, label_ind, label_eng, value_ind, value_eng, created_by, created_at
-- SELECT: id, icon, label_ind, label_eng, value_ind, value_eng
-- ============================================================
CREATE TABLE IF NOT EXISTS `venue_keys` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `vanue_id`   INT(11)      NOT NULL,
    `icon`       VARCHAR(255) NULL,
    `label_ind`  VARCHAR(255) NOT NULL,
    `label_eng`  VARCHAR(255) NOT NULL,
    `value_ind`  VARCHAR(500) NOT NULL,
    `value_eng`  VARCHAR(500) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL DEFAULT 'system',
    `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_vanue_id` (`vanue_id`),
    CONSTRAINT `fk_venue_keys_vanue`
        FOREIGN KEY (`vanue_id`) REFERENCES `vanue` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: Booking (Prisma model — for invoices)
-- Source: /Users/rivky/code/Tembi-Web/prisma/schema.prisma
-- Used by: /app/api/admin/invoices/route.ts via Prisma ORM
-- ============================================================
CREATE TABLE IF NOT EXISTS `Booking` (
    `id`                 VARCHAR(36)    NOT NULL,
    `roomId`             VARCHAR(255)   NOT NULL,
    `roomSlug`           VARCHAR(255)   NOT NULL,
    `roomName`           VARCHAR(255)   NOT NULL,
    `roomPrice`          DOUBLE         NOT NULL,
    `basePrice`          DOUBLE         NOT NULL,
    `serviceFee`         DOUBLE         NOT NULL,
    `tourismTax`         DOUBLE         NOT NULL,
    `totalPrice`         DOUBLE         NOT NULL,
    `breakfast`          INT(11)        NOT NULL DEFAULT 0,
    `extraBed`           INT(11)        NOT NULL DEFAULT 0,
    `checkInDate`        DATETIME       NOT NULL,
    `checkOutDate`       DATETIME       NOT NULL,
    `duration`           INT(11)        NOT NULL,
    `adults`             INT(11)        NOT NULL,
    `children`           INT(11)        NOT NULL,
    `customerName`       VARCHAR(255)   NOT NULL,
    `customerEmail`      VARCHAR(255)   NOT NULL,
    `customerPhone`      VARCHAR(50)    NOT NULL,
    `customerAddress`    TEXT           NOT NULL,
    `customerCity`       VARCHAR(255)   NOT NULL,
    `customerPostalCode` VARCHAR(20)    NOT NULL,
    `status`             VARCHAR(50)    NOT NULL DEFAULT 'PENDING',
    `xenditInvoiceId`    VARCHAR(255)   NULL,
    `xenditInvoiceUrl`   VARCHAR(1000)  NULL,
    `createdAt`          DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt`          DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_customerEmail` (`customerEmail`),
    INDEX `idx_createdAt` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


SET FOREIGN_KEY_CHECKS = 1;
