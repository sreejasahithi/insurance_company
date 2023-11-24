/*
create database insurance_db;
use insurance_db;
*/
/*
CREATE TABLE new_table_name (
    admin_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (admin_id, username)
);

*/
/*
INSERT INTO admin (username, password) VALUES
('sreeja_c', 'sree123'),
('vaish_r', 'vaish123'),
('pri_s', 'pri123');
 */
 /*
CREATE TABLE policy_holder (
    policyholder_id INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(20),lname VARCHAR(20),age INT,
    email VARCHAR(30),phone VARCHAR(255),dob DATE,city VARCHAR(20),
    statee VARCHAR(20),pin VARCHAR(20),PRIMARY KEY (policyholder_id));
*/
/*
CREATE TABLE policyholder_login (
    policyholder_id INT,
    username VARCHAR(30) ,
    password VARCHAR(30),
    PRIMARY KEY (username),
    FOREIGN KEY (policyholder_id) REFERENCES policy_holder(policyholder_id)
);
*/
/*
CREATE TABLE agent_data (
    agent_id INT NOT NULL AUTO_INCREMENT,firstname VARCHAR(255),lastname VARCHAR(255),
    email VARCHAR(255),phonenumber VARCHAR(255),licensenumber VARCHAR(20),
    dob DATE,city VARCHAR(255),street VARCHAR(255),zipcode VARCHAR(10),PRIMARY KEY (agent_id)
);
CREATE TABLE agent_login (
    agent_id INT,username VARCHAR(20),password VARCHAR(20),
    PRIMARY KEY (username),FOREIGN KEY (agent_id) REFERENCES agent_data(agent_id)
);
*/
/*
CREATE TABLE POLICY (policy_id int primary key,type varchar(30),description varchar(255));
CREATE TABLE PLAN (plan_id int primary key,name varchar(30),
premium_amount int,description varchar(255),policy_id int ,
foreign key(policy_id) references policy(policy_id));*/
/*
CREATE TABLE policy_issued_by(policyholder_id int ,policy_id int , start_date date,
end_date date,foreign key(policyholder_id) references policy_holder(policy_holder_id),
foreign key(policy_id) references policy(policy_id),primary key(policyholder_id,policy_id));
CREATE TABLE agent_sold_policy(agent_id int ,policy_id int,foreign key(agent_id) references agent_data(agent_id),foreign key(policy_id) references policy(policy_id),primary key(agent_id,policy_id));
INSERT INTO policy (policy_id,type,description) values(123,"Medical","Medical insurance is a 
financial arrangement that individuals.The insurer 
commits to covering a portion of healthcare expenses, such as doctor visits, hospital stays, \
medications,and preventive care."),(124,"Vehical",
"Vehicle insurance offers financial protection against accidents, theft, and damage to vehicles."),
(125,"Life","Life insurance offers 
peace of mind with a tax-free payout to beneficiaries upon the policyholder's death, 
ensuring financial security and covering expenses 
and future needs.
");*/
/*
insert into plan(plan_id,name,premium_amount,description,policy_id) values 
(151,"Catastrophic Health Insurance",5000,"provides protection against major, unexpected medical expenses
and are cost effective",123);
insert into plan(plan_id,name,premium_amount,description,policy_id) values 
(152,"Children's Health Insurance",4000,"It ensures that children from low-income families receive necessary medical care.",123);
insert into plan(plan_id,name,premium_amount,description,policy_id) values 
(153,"Critical Illness Insurance",6000,"provides a lump-sum payment upon diagnosis of diseases such as cancer, heart attack, or stroke.This covers medical expenses, loss of income, or other financial needs.",123)
*/
/*
insert into plan(plan_id,name,premium_amount,description,policy_id) values
(261,"Liability Insurance",4500," It covers bodily injury and property damage liability,ensuring that if you're at fault in an accident,the other party's medical expenses and vehicle repairs are covered.",124),
(262,"Commercial Auto Insurance",4250,"It covers vehicles used for business purposes.It helps businesses maintain financial stability by ensuring that vehicles are safe.",124),
(263,"Gap Insurance",3000,"It is often considered by those with auto loans or leases to cover the gap between the actual cash value of their vehicle and the remaining loan or lease balance if the car is totaled.",124);
*/
/*
insert into plan(plan_id,name,premium_amount,description,policy_id) values
(341,"Term Life Insurance",3500,"It provides coverage for a specified term, typically 10, 20, or 30 years.
It offers a death benefit but does not build cash value.",125),
(342,"Whole Life Insurance",4250,"It provides lifelong coverage,
includes a cash value component that grows over time and can be borrowed against.",125),
(343,"Joint Life Insurance",4500,"It covers two individuals under a single policy,paying out upon the first insured's passing or the passing of both individuals.",125);
*/
/*
create table coverage(coverage_id int,coverage_name varchar(30),coverage_description varchar(255)
,coverage_amount int,plan_id int,foreign key(plan_id) references plan(plan_id),primary key(coverage_id));

insert into coverage(coverage_id,coverage_name,coverage_description,coverage_amount,plan_id) 
values(112,"Dental and Vision Care","Children's health insurance often includes coverage for dental and vision care, recognizing the importance of maintaining oral and visual health in children.
",4000,152);
insert into coverage(coverage_id,coverage_name,coverage_description,coverage_amount,plan_id) 
values(113,"Specialized Pediatric Care","Insurance for children often covers 
specialized care for chronic conditions,disabilities.
This may include access to pediatric specialists and therapies.",5000,152),
(114,"Cancer Coverage","This coverage typically includes various forms of cancer,
such as breast cancer,lung cancer,prostate cancer,and other malignancies.",6500,153),
(115,"Organ Transplant Coverage","This coverage may include the expenses related to 
organ transplants.",4000,153);
insert into coverage(coverage_id,coverage_name,coverage_description,coverage_amount,plan_id) 
values(116,"General Liability Insurance","Provides coverage for bodily injury, property damage, and personal injury 
claims arising from your business operations or premises.",3500,261),
(117,"Employers' Liability Insurance","Provides coverage for claims made by employees for work-related injuries or 
illnesses that are not covered by workers' compensation.",3750,261);
insert into coverage(coverage_id,coverage_name,coverage_description,coverage_amount,plan_id) 
values(118,"Property Damage Liability","Covers damage to other people's property caused by the policyholder's vehicle."
,4250,262),
(119,"Towing and Roadside Assistance","Covers the cost of towing and other emergency roadside services."
,4150,262),
(120,"Vehicle Replacement Insurance"," it provides funds to replace a totaled vehicle with a brand-new one.
",3600,263),
(121,"Total Loss Deductible Waiver","Waives the deductible if the insured vehicle is declared a total loss.",
4200,263);
insert into coverage(coverage_id,coverage_name,coverage_description,coverage_amount,plan_id) 
values(122,"Death Benefit","Pays a tax-free lump sum to the beneficiaries if the insured person dies during the policy term."
,5500,341),
(123,"Accelerated Death Benefit","Provides the option to receive a portion of the death benefit in advance if the insured is diagnosed with a terminal illness.",
5750,341),
(124,"Prescription Drug Coverage","Catastrophic plans may provide coverage for prescription medications, especially those related to major medical conditions.",
4600,151),
(125,"Emergency Room Visits","Coverage for emergency room visits is often included, even if the deductible hasn't been met. This is crucial for addressing unforeseen medical emergencies.",
4250,151);
insert into coverage(coverage_id,coverage_name,coverage_description,coverage_amount,plan_id) 
values(126,"Death Benefit","This is the amount of money paid to the designated 
beneficiaries upon the death of the insured.This is typically tax-free and 
is intended to provide financial support to the beneficiaries, helping them cover expenses.",
4500,342),
(127,"Survivorship Benefit","Pays out the death benefit when the second insured person passes away, providing financial support for the surviving 
partner and beneficiaries.",5200,343);
*/
/*
create table claim(claim_id int auto_increment,claim_date date,status varchar(20),reason varchar(60),
policyholder_id int,foreign key(policyholder_id) references policy_holder(policyholder_id),
primary key(claim_id));

create table claims_coverage(claim_id int,coverage_id int,claimed_amount int,
primary key(claim_id,coverage_id),foreign key(claim_id) references claim(claim_id),
foreign key(coverage_id) references coverage(coverage_id));*/
/*create table beneficiary(beneficiary_id int auto_increment,policyholder_id int,fname varchar(30),lname varchar(30),age int,
email varchar(30),phone int,dob date,city varchar(30),state varchar(30),pin varchar(20),
primary key(beneficiary_id,policyholder_id),foreign key(policyholder_id) references
policy_holder(policyholder_id));*/  
/*
CREATE PROCEDURE CalculateBonus(IN agent_username VARCHAR(255), OUT bonus_amount INT)
BEGIN
  DECLARE agent_id INT;
  DECLARE sold_policies_count INT;

  SELECT agent_id INTO agent_id
  FROM agent_data
  WHERE agent_data.username = agent_username;

  SELECT COUNT(*) INTO sold_policies_count
  FROM agent_sold_policy
  WHERE agent_id = agent_id;

  SET bonus_amount = sold_policies_count * 1000;

END //

DELIMITER ;
    */
    
    /*
    CREATE FUNCTION end_date_plan(start_date DATE)
    RETURNS DATE
    DETERMINISTIC
BEGIN
    DECLARE result_date DATE;
    SET result_date = DATE_ADD(start_date, INTERVAL 2 YEAR);
    RETURN result_date;
END;

    */
    
    /*
    CREATE ROLE 'Policy_holder_role';

    GRANT SELECT, INSERT, UPDATE, DELETE 
  ON insurance_db.policy_holder TO 'Policy_holder_role';

GRANT SELECT, INSERT, UPDATE, DELETE 
  ON insurance_db.policyholder_login TO 'Policy_holder_role';

GRANT SELECT, INSERT, UPDATE, DELETE 
  ON insurance_db.beneficiary TO 'Policy_holder_role';

GRANT SELECT, INSERT, UPDATE, DELETE 
  ON insurance_db.claim TO 'Policy_holder_role';

GRANT SELECT, INSERT, UPDATE, DELETE 
  ON insurance_db.claims_coverage TO 'Policy_holder_role';

GRANT SELECT, INSERT, UPDATE, DELETE 
  ON insurance_db.policy_issued_by TO 'Policy_holder_role';
  GRANT SELECT ON insurance_db.coverage TO 'Policy_holder_role';
   GRANT SELECT ON insurance_db.plan TO 'Policy_holder_role';
    GRANT SELECT ON insurance_db.policy TO 'Policy_holder_role';*/


/*
 CREATE USER 'pri'@'localhost' IDENTIFIED BY 'pri123';
  CREATE USER 'ram_sham'@'localhost' IDENTIFIED BY 'sha123';
   CREATE USER 'madhvi_sharma'@'localhost' IDENTIFIED BY 'sharma123';
 GRANT 'Policy_holder_role' TO 'pri'@'localhost';
 GRANT 'Policy_holder_role' TO 'ram_sham'@'localhost';
 GRANT 'Policy_holder_role' TO 'madhvi_sharma'@'localhost';
   
*/

/*
CREATE ROLE 'Agent_role';
GRANT SELECT , UPDATE,DELETE,INSERT on insurance_db.agent_data to 'Agent_role';
GRANT SELECT , UPDATE,DELETE,INSERT on insurance_db.agent_login to 'Agent_role';
GRANT SELECT , UPDATE,DELETE,INSERT on insurance_db.agent_sold_policy to 'Agent_role';
GRANT SELECT  on insurance_db.policy to 'Agent_role';
GRANT SELECT  on insurance_db.plan to 'Agent_role';
*/

/*
CREATE USER 'prarth'@'localhost' IDENTIFIED BY 'p123';
CREATE USER 'sirisha_c'@'localhost' IDENTIFIED BY 'siri123';
CREATE USER 'sri_sai'@'localhost' IDENTIFIED BY 'sri123';
*/

/*
GRANT 'Agent_role' TO 'prarth'@'localhost';
GRANT 'Agent_role' TO 'sirisha_c'@'localhost';
GRANT 'Agent_role' TO 'sri_sai'@'localhost';
*/
/*
CREATE ROLE 'Admin_role';
 GRANT ALL PRIVILEGES ON insurance_db.* TO 'Admin_role';
 CREATE USER 'sreeja_c'@'localhost' IDENTIFIED BY 'sree123';
CREATE USER 'vaish_r'@'localhost' IDENTIFIED BY 'vaish123';
CREATE USER 'pri_s'@'localhost' IDENTIFIED BY 'pri123';
GRANT Admin_role TO 'sreeja_c'@'localhost';
GRANT Admin_role TO 'vaish_r'@'localhost';
GRANT Admin_role TO 'pri_s'@'localhost';

*/