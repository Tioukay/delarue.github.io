CREATE TABLE IF NOT EXISTS psh_raw
(
    rid int(11) NOT NULL AUTO_INCREMENT COMMENT 'Row unique id',
    fk_user int(11) NOT NULL COMMENT 'Reference to user table',
    time datetime NOT NULL,
    direct int(11) NOT NULL COMMENT 'Enter = 1; Leave = 0',
    type int(11) NOT NULL COMMENT 'Type of leave: General = 1;Vacation = 2;
Doctor = 3...',
    PRIMARY KEY (rid)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- TODO: Make usr table --
-- TODO: Make links between table --
