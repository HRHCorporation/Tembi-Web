-- Add Event and Blog to mstr_page
INSERT INTO `mstr_page` (`code`, `name`) VALUES (6, 'Event');
INSERT INTO `mstr_page` (`code`, `name`) VALUES (7, 'Blog');

-- Add default banner for Event page (code = 6)
INSERT INTO `room_page_meta` (`code`, `title_ind`, `title_eng`, `subtitle_ind`, `subtitle_eng`, `description_ind`, `description_eng`, `image`)
VALUES (6, 'Event Kami', 'Our Events', 'Temukan berbagai acara budaya di Tembi', 'Discover cultural events at Tembi', '', '', '');

-- Add default banner for Blog page (code = 7)
INSERT INTO `room_page_meta` (`code`, `title_ind`, `title_eng`, `subtitle_ind`, `subtitle_eng`, `description_ind`, `description_eng`, `image`)
VALUES (7, 'Blog Kami', 'Our Blog', 'Cerita dan inspirasi dari Tembi', 'Stories and inspiration from Tembi', '', '', '');
