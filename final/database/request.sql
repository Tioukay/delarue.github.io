-- Requests --
drop view RECAP;

-- When did the user come in January --
select fk_user, time
from psh_raw
where MONTH(time) = '01'
and direct = 1;

-- When did the user leave in January --
select fk_user, time
from psh_raw
where MONTH(time) = '01'
and direct = 0;

-- Give every day arrival and departure, and how much time was spent
CREATE VIEW RECAP as
select distinct fk_user, DATE_FORMAT(ARRI.time, '%d %M %H:%i:%s') as ENTER, DATE_FORMAT(DEP.time, '%d %M %H:%i:%s') as QUIT, TIMEDIFF(DEP.time, ARRI.time) as TIME_SPENT
from psh_raw, (select fk_user as ID_USR, time
            from psh_raw
            where MONTH(time) = '01'
            and direct = 1) ARRI,
            (select fk_user as ID_USR, time
            from psh_raw
            where MONTH(time) = '01'
            and direct = 0) DEP
where DAY(ARRI.time) = DAY(DEP.time)
and fk_user = ARRI.ID_USR
and fk_user = DEP.ID_USR;

select * from RECAP;

select fk_user, SUM(HOUR(TIME_SPENT)) as HOURS_OF_WORK
from RECAP
group by fk_user;
