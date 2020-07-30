import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1596123773699 implements MigrationInterface {
    name = 'createTables1596123773699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `student` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `key` int NOT NULL, `email` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `course` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `duration` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_30d559218724a6d6e0cc4f26b0` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lesson` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `classe_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `content` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `linkContent` varchar(255) NOT NULL, `lesson_id` int NULL, UNIQUE INDEX `REL_a2b70b7b1d78329f1b697ebef1` (`lesson_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `classe_student` (`classe_id` int NOT NULL, `student_id` int NOT NULL, INDEX `IDX_0e2e7f79f654f271ed98269996` (`classe_id`), INDEX `IDX_6b9476970f9e5e36d544e2b2b4` (`student_id`), PRIMARY KEY (`classe_id`, `student_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `lesson` ADD CONSTRAINT `FK_a7f0924d071a1882a64286ef38e` FOREIGN KEY (`classe_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `content` ADD CONSTRAINT `FK_a2b70b7b1d78329f1b697ebef19` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `classe_student` ADD CONSTRAINT `FK_0e2e7f79f654f271ed982699960` FOREIGN KEY (`classe_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `classe_student` ADD CONSTRAINT `FK_6b9476970f9e5e36d544e2b2b43` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `classe_student` DROP FOREIGN KEY `FK_6b9476970f9e5e36d544e2b2b43`");
        await queryRunner.query("ALTER TABLE `classe_student` DROP FOREIGN KEY `FK_0e2e7f79f654f271ed982699960`");
        await queryRunner.query("ALTER TABLE `content` DROP FOREIGN KEY `FK_a2b70b7b1d78329f1b697ebef19`");
        await queryRunner.query("ALTER TABLE `lesson` DROP FOREIGN KEY `FK_a7f0924d071a1882a64286ef38e`");
        await queryRunner.query("DROP INDEX `IDX_6b9476970f9e5e36d544e2b2b4` ON `classe_student`");
        await queryRunner.query("DROP INDEX `IDX_0e2e7f79f654f271ed98269996` ON `classe_student`");
        await queryRunner.query("DROP TABLE `classe_student`");
        await queryRunner.query("DROP INDEX `REL_a2b70b7b1d78329f1b697ebef1` ON `content`");
        await queryRunner.query("DROP TABLE `content`");
        await queryRunner.query("DROP TABLE `lesson`");
        await queryRunner.query("DROP INDEX `IDX_30d559218724a6d6e0cc4f26b0` ON `course`");
        await queryRunner.query("DROP TABLE `course`");
        await queryRunner.query("DROP TABLE `student`");
    }

}
