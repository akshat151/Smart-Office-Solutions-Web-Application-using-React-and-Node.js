CREATE DATABASE IF NOT EXISTS officedb;

USE officedb;

-- DROP TABLE IF EXISTS Roles;

CREATE TABLE Roles (
    name VARCHAR(255) PRIMARY KEY
);

-- DROP PROCEDURE IF EXISTS is_staff;

DELIMITER $$
CREATE FUNCTION is_staff
(
	staffId INT
) RETURNS boolean
DETERMINISTIC
BEGIN

	RETURN 	("STAFF_MEMBER" = (SELECT role 
	FROM staff
	WHERE staff.staffId = staffId));

END $$
DELIMITER ;


-- DROP PROCEDURE IF EXISTS is_admin;

DELIMITER $$
CREATE FUNCTION is_admin
(
	staffId INT
) RETURNS boolean
DETERMINISTIC
BEGIN

	RETURN 	("ADMIN" = (SELECT role 
	FROM staff
	WHERE staff.staffId = staffId));

END $$
DELIMITER ;


-- DROP TABLE IF EXISTS Clients;

CREATE TABLE Clients (
    clientId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
	mobile BIGINT(10) CONSTRAINT CK_MOBILE_CLIENT CHECK (LENGTH(Staff.mobile) = 10),
    email VARCHAR(255) NOT NULL UNIQUE CONSTRAINT CK_EMAIL_CLIENT CHECK (clients.email like '%_@__%.__%'),
    address VARCHAR(255)
);


-- DROP Procedure IF EXISTS add_client;

DROP PROCEDURE IF EXISTS add_client;

DELIMITER $$
CREATE PROCEDURE add_client
(
	staffId INT,
	name VARCHAR(255),
    mobile CHAR(10),
    email VARCHAR(255),
    address VARCHAR(255)
)
BEGIN

	IF(is_admin(staffId))
    THEN 
		INSERT INTO Clients 
        (Clients.name, Clients.mobile, Clients.email, Clients.address) 
        VALUES 
        (name, mobile, email, address);
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS update_client;

DELIMITER $$
CREATE PROCEDURE update_client
(
	staffId INT,
	clientId INT,
	name VARCHAR(255),
    mobile CHAR(10),
    email VARCHAR(255),
    address VARCHAR(255)
)
BEGIN

	IF(is_admin(staffId))
    THEN 
    
		UPDATE Clients 
        SET 
			Clients.name = name,
			Clients.mobile = mobile,
            Clients.email = email,
            Clients.address = address
        WHERE Clients.clientId = clientId;
        
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS delete_client;

DELIMITER $$
CREATE PROCEDURE delete_client
(
	staffId INT,
	clientId INT
)
BEGIN

	IF(is_admin(staffId))
    THEN 
    
		DELETE FROM Clients 
        WHERE Clients.clientId = clientId;
        
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END $$
DELIMITER ;



-- DROP TABLE IF EXISTS Staff;

CREATE TABLE Staff (
    staffId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
	mobile BIGINT(10) CONSTRAINT CK_MOBILE_STAFF CHECK (LENGTH(Staff.mobile) = 10),
	email VARCHAR(255) NOT NULL UNIQUE CONSTRAINT CK_EMAIL_STAFF CHECK (staff.email like '%_@__%.__%'),
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
	dob DATE,
    sex VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    
	CONSTRAINT FK_Role FOREIGN KEY (role)
		REFERENCES Roles(name)
);	


-- DROP PROCEDURE IF EXISTS add_staff;

DELIMITER $$
CREATE PROCEDURE add_staff
(
	staffId INT,
    name VARCHAR(255),
	mobile CHAR(10),
    email VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
	dob DATE,
    sex VARCHAR(255),
    role VARCHAR(255)
)
BEGIN

	IF(is_admin(staffId))
    THEN 
		INSERT INTO Staff 
        (
			Staff.name, 
            Staff.mobile, 
            Staff.email, 
            Staff.password, 
            Staff.address,
            Staff.dob,
            Staff.sex,
            Staff.role
		) 
        VALUES 
        (
			name,
			mobile,
			email,
			password,
			address,
			dob,
			sex,
			role
        );
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS update_staff;

DELIMITER $$
CREATE PROCEDURE update_staff
(
	hostId INT,
	staffId INT,
    name VARCHAR(255),
	mobile CHAR(10),
    email VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
	dob DATE,
    sex VARCHAR(255),
    role VARCHAR(255)
)
BEGIN

	IF(is_admin(hostId))
    THEN 
    
    
		UPDATE Staff 
        SET 
			Staff.name = name, 
            Staff.mobile = mobile, 
            Staff.email = email, 
            Staff.password = password, 
            Staff.address = address,
            Staff.dob = dob,
            Staff.sex = sex,
            Staff.role = role
        WHERE Staff.staffId = staffId;
    
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS delete_staff;

DELIMITER $$
CREATE PROCEDURE delete_staff
(
	hostId INT,
	staffId INT
)
BEGIN

	IF(is_admin(hostId))
    THEN 
    
		DELETE FROM Staff 
        WHERE Staff.staffId = staffId;
        
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END $$
DELIMITER ;



-- DROP TABLE IF EXISTS TaskTypes;

CREATE TABLE TaskTypes (
    taskTypeId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    price DECIMAL(15, 2) NOT NULL
);		




-- DROP TABLE IF EXISTS Tasks;

CREATE TABLE Tasks (
    taskId INT PRIMARY KEY AUTO_INCREMENT,
    taskTypeId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
	description VARCHAR(255),
    status ENUM("NOT_STARTED", "ON_GOING", "COMPLETED", "BLOCKED") NOT NULL DEFAULT "NOT_STARTED",
	startDate DATE,
    priority ENUM("P0", "P1", "P2") NOT NULL DEFAULT "P0",
    clientId INT NOT NULL,

	CONSTRAINT FK_TaskType FOREIGN KEY (taskTypeId)
		REFERENCES TaskTypes(taskTypeId),
        
	CONSTRAINT FK_Clients FOREIGN KEY (clientId)
		REFERENCES Clients(clientId)
);


-- DROP TABLE IF EXISTS TasksAssigned;

CREATE TABLE TasksAssigned (
    taskId INT,
	staffId INT,
    PRIMARY KEY (staffId, taskId),

	CONSTRAINT FK_Tasks FOREIGN KEY (taskId)
		REFERENCES Tasks(taskId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
	CONSTRAINT FK_Staff FOREIGN KEY (staffId)
		REFERENCES Staff(staffId)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- DROP PROCEDURE IF EXISTS get_staff_of_task;

DELIMITER $$
CREATE PROCEDURE get_staff_of_task(taskId INT)
BEGIN
    
	SELECT 
			tasksAssigned.staffId,
			staff.name,
			staff.email
	FROM tasksAssigned

	JOIN staff
	ON staff.staffId = tasksAssigned.staffId
    
    WHERE tasksAssigned.taskId = taskId;

		
END $$
DELIMITER ;


-- DROP PROCEDURE IF EXISTS add_staff_to_task;

DELIMITER $$
CREATE PROCEDURE add_staff_to_task(
	taskId INT,
    staffId INT
)
BEGIN
    
    INSERT INTO tasksAssigned
		( taskId, staffId )
    VALUES
		( taskId, staffId );
        
	SELECT taskId;
    
END $$
DELIMITER ;




-- DROP PROCEDURE IF EXISTS remove_staff_from_task;

DELIMITER $$
CREATE PROCEDURE remove_staff_from_task(
	taskId INT,
    staffId INT
)
BEGIN

    DELETE FROM tasksAssigned 
    WHERE tasksAssigned.taskId = taskId AND tasksAssigned.staffId = staffId;
	    
END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS create_task;

DELIMITER $$
CREATE PROCEDURE create_task(
	taskTypeId INT,
    title VARCHAR(255),
    description VARCHAR(255),
    status ENUM("NOT_STARTED", "ON_GOING", "COMPLETED", "BLOCKED"),
    startDate DATE,
    priority ENUM("P0", "P1", "P2"),
    clientId INT,
    staffId INT
)
BEGIN
	INSERT INTO Tasks
	(
		taskTypeId,
		title,
		description,
		status,
        startDate,
        priority,
		clientId
	)
	VALUES 
	(
		taskTypeId,
		title,
		description,
        status,
        startDate,
        priority,
		clientId
	);
    
    CALL add_staff_to_task( 
		LAST_INSERT_ID(),
        staffId
    );
    
    
END $$
DELIMITER ;
		

-- DROP PROCEDURE IF EXISTS get_tasks;

DELIMITER $$
CREATE PROCEDURE get_tasks()
BEGIN
	SELECT 
    
		tasksAssigned.taskId,
		taskTypes.taskTypeId AS taskTypeId,
		taskTypes.name AS taskType,
        tasks.title,
		tasks.description,
		tasks.status,
		tasks.startDate,
		tasks.priority,
		clients.name AS client,
		clients.clientId AS clientId,
        COUNT(tasksAssigned.staffId) AS num_members
			
	FROM tasksAssigned

	LEFT JOIN
	tasks
	ON tasks.taskId = tasksAssigned.taskId

	LEFT JOIN
	staff
	ON staff.staffId = tasksAssigned.staffId

	LEFT JOIN
	clients
	ON clients.clientId = tasks.clientId
    
    LEFT JOIN
    taskTypes
    ON taskTypes.taskTypeId = tasks.taskTypeId
    	
    GROUP BY tasksAssigned.taskId;

END $$
DELIMITER ;



-- DROP TABLE IF EXISTS meetings;

CREATE TABLE meetings (
    meetingId INT AUTO_INCREMENT PRIMARY KEY,
	time DATETIME NOT NULL,
	title VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);


-- DROP TABLE IF EXISTS meetingClientMembers;

CREATE TABLE meetingClientMembers (
	meetingId INT,
    clientId INT,
    
    PRIMARY KEY(meetingId, clientId),
    
	CONSTRAINT FK_Meetings FOREIGN KEY (meetingId)
		REFERENCES meetings(meetingId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
	CONSTRAINT FK_Meetings_Clients FOREIGN KEY (clientId)
		REFERENCES Clients(clientId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- DROP TABLE IF EXISTS meetingStaffMembers;

CREATE TABLE meetingStaffMembers (
	meetingId INT,
    staffId INT NOT NULL,
    	
	PRIMARY KEY(meetingId, staffId),
    
	CONSTRAINT FK_Meetings_ FOREIGN KEY (meetingId)
		REFERENCES meetings(meetingId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
	CONSTRAINT FK_MEETINGS_Staff FOREIGN KEY (staffId)
		REFERENCES Staff(staffId)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);	


-- DROP PROCEDURE IF EXISTS create_meeting;

DELIMITER $$
CREATE PROCEDURE create_meeting
(
	time DATETIME,
	title VARCHAR(255),
    description VARCHAR(255),
    hostId INT,
    staffId INT
)
BEGIN

	IF(hostId = staffId)
	THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Host and meeting member cannot be same.';
    ELSE
    
		START TRANSACTION;
    
			-- adding to meetings.
			INSERT INTO
			meetings
			(
				meetings.time, 
				meetings.title, 
				meetings.description
			)
			VALUES
			(
				time,
				title,
				description
			);
			
			CALL add_staff_in_meeting(LAST_INSERT_ID(), hostId);
			CALL add_staff_in_meeting(LAST_INSERT_ID(), staffId);
            
		COMMIT;

    END IF;

END $$
DELIMITER ;


-- DROP PROCEDURE IF EXISTS get_meetings;

DELIMITER $$
CREATE PROCEDURE get_meetings()
BEGIN

	SELECT *
    FROM meetings;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS update_meeting;

DELIMITER $$
CREATE PROCEDURE update_meeting(
	staffId INT,
	meetingId INT,
	description VARCHAR(255)
)
BEGIN

	-- check authenticity
	IF(
			(		SELECT COUNT(*)
					FROM meetingStaffMembers
					WHERE 
                    meetingStaffMembers.meetingId = meetingId AND
                    meetingStaffMembers.staffId = staffId
			) > 0
	)
	THEN
		UPDATE meetings
		SET meetings.description = description
		WHERE meetings.meetingId = meetingId;    
        
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
        
    END IF;

END $$
DELIMITER ;




-- DROP PROCEDURE IF EXISTS delete_meeting;

DELIMITER $$
CREATE PROCEDURE delete_meeting(
	staffId INT,
	meetingId INT
)
BEGIN

	-- check authenticity
	IF(
			(		SELECT COUNT(*)
					FROM meetingStaffMembers
					WHERE 
                    meetingStaffMembers.meetingId = meetingId AND
                    meetingStaffMembers.staffId = staffId
			) > 0
	)
	THEN
		DELETE FROM 
        meetings 
        WHERE meetings.meetingId = meetingId;
        
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
        
    END IF;



END $$
DELIMITER ;
	




-- DROP PROCEDURE IF EXISTS add_staff_in_meeting;

DELIMITER $$
CREATE PROCEDURE add_staff_in_meeting
(
	meetingId INT,
	staffId INT
)
BEGIN

	-- adding staff in meeting.
    INSERT INTO
    meetingStaffMembers
	(
		meetingStaffMembers.meetingId, 
        meetingStaffMembers.staffId
	)
	VALUES
	(
		meetingId,
        staffId
	);

END $$
DELIMITER ;


-- DROP PROCEDURE IF EXISTS add_client_in_meeting;

DELIMITER $$
CREATE PROCEDURE add_client_in_meeting
(
	meetingId INT,
	clientId INT
)
BEGIN

	-- adding staff in meeting.
    INSERT INTO
    meetingClientMembers
	(
		meetingClientMembers.meetingId, 
        meetingClientMembers.clientId
	)
	VALUES
	(
		meetingId,
        clientId
	);

END $$
DELIMITER ;




-- DROP PROCEDURE IF EXISTS remove_staff_from_meeting;

DELIMITER $$
CREATE PROCEDURE remove_staff_from_meeting
(
	meetingId INT,
	staffId INT
)
BEGIN

	-- check count. Cannot delete if less than 2.
    IF(
			(SELECT COUNT(staffId)
			FROM meetingStaffMembers
			WHERE meetingStaffMembers.meetingId = meetingId
			GROUP BY meetingStaffMembers.meetingId) > 2
    )
    THEN
    	-- deleting staff from meeting.
		DELETE FROM meetingStaffMembers 
		WHERE 
			meetingStaffMembers.meetingId = meetingId AND
			meetingStaffMembers.staffId = staffId;
    ELSE
    
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ATLEAST 2 MEMBERS ARE REQUIRED IN A MEETING.';
    
    END IF;

END $$
DELIMITER ;


-- DROP PROCEDURE IF EXISTS remove_client_from_meeting;

DELIMITER $$
CREATE PROCEDURE remove_client_from_meeting
(
	meetingId INT,
	clientId INT
)
BEGIN
	-- deleting staff from meeting.
	DELETE FROM meetingClientMembers 
	WHERE 
		meetingClientMembers.meetingId = meetingId AND
		meetingClientMembers.clientId = clientId;

END $$
DELIMITER ;


-- DROP PROCEDURE IF EXISTS get_client_in_meeting;

DELIMITER $$
CREATE PROCEDURE get_client_in_meeting
(
	meetingId INT
)
BEGIN

	SELECT 
		meetingClientMembers.clientId,
		clients.name,
		clients.mobile,
		clients.email
		
	FROM meetingClientMembers

	JOIN Clients
	ON Clients.clientId = meetingClientMembers.clientId
    
    WHERE meetingClientMembers.meetingId = meetingId;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS get_staff_in_meeting;

DELIMITER $$
CREATE PROCEDURE get_staff_in_meeting
(
	meetingId INT
)
BEGIN

	SELECT 
		meetingStaffMembers.staffId,
		staff.name,
		staff.mobile,
		staff.email
		
	FROM meetingStaffMembers

	JOIN Staff
	ON Staff.staffId = meetingStaffMembers.staffId

	WHERE meetingStaffMembers.meetingId = meetingId;

END $$
DELIMITER ;
	

-- DROP TABLE IF  EXISTS officeHours;

CREATE TABLE officeHours (
    officeHoursId INT AUTO_INCREMENT PRIMARY KEY,
	taskId INT NOT NULL,
    staffId INT NOT NULL,
	description VARCHAR(255),
    hours DECIMAL(6,2) NOT NULL CHECK(hours>= 0 and hours <= 12),
    
	CONSTRAINT FK_Office_Hours_task FOREIGN KEY (taskId)
		REFERENCES tasks(taskId)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
        
	CONSTRAINT FK_Office_Hours_staff FOREIGN KEY (staffId)
		REFERENCES staff(staffId)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);



-- DROP PROCEDURE IF EXISTS enter_office_hours;

DELIMITER $$
CREATE PROCEDURE enter_office_hours
(
	taskId INT,
    staffId INT,
	description VARCHAR(255),
    hours DECIMAL(6,2)
)
BEGIN

	-- check authenticity.
    IF(
			(SELECT COUNT(*)
			FROM tasksassigned
			WHERE tasksassigned.taskId = taskId AND tasksassigned.staffId = staffId) > 0
    )
    THEN
    
		INSERT INTO 
        officeHours
        (officeHours.taskId, officeHours.staffId, officeHours.description, officeHours.hours)
        VALUES
        (taskId, staffId, description, hours);
    
    ELSE
    
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    
    END IF;

END $$
DELIMITER ;



-- DROP PROCEDURE IF EXISTS get_office_hours;

DELIMITER $$
CREATE PROCEDURE get_office_hours
(
    staffId INT
)
BEGIN

	SELECT 
		officeHours.officeHoursId,
		officeHours.taskId,
        officeHours.staffId,
        officeHours.description,
        officeHours.hours,
        tasks.taskTypeId,
        tasktypes.name,
        tasks.title,
        tasks.priority
        
    FROM officeHours
    
    LEFT JOIN
    tasks
    ON tasks.taskId = officeHours.taskId
    
	LEFT JOIN
    tasktypes
    ON tasktypes.tasktypeId = tasks.taskTypeId
    
    WHERE officeHours.staffId = staffId;

END $$
DELIMITER ;




-- DROP PROCEDURE IF EXISTS delete_office_hours;

DELIMITER $$
CREATE PROCEDURE delete_office_hours
(
    officeHoursId INT,
    staff INT
)
BEGIN

	DELETE FROM officeHours
    WHERE 
    officeHours.staffId = staffId AND officeHours.officeHoursId = officeHoursId;

END $$
DELIMITER ;


-- Adding Sample Data

INSERT INTO `officedb`.`roles`
(`name`)
VALUES
("ADMIN");

INSERT INTO `officedb`.`roles`
(`name`)
VALUES
("STAFF_MEMBER");
	
INSERT INTO `officedb`.`staff`
(
	`staffId`,
	`name`,
	`mobile`,
	`email`,
	`password`,
	`address`,
	`dob`,
	`sex`,
	`role`
)
VALUES
(	
	1,
	"admin",
	"8573088848",
	"admin@gmail.com",
	"$2a$10$LyNSb92O0iNzHaj0jGu.6OvIn2bhEUrSG7jGWRmcG5qBJXptVJIai",
	"75 Peter Parley Road", 
	"1998-09-15",
	"male",
	"ADMIN"
);

























