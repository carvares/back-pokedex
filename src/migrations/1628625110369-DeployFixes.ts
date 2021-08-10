import {MigrationInterface, QueryRunner} from "typeorm";

export class DeployFixes1628625110369 implements MigrationInterface {
    name = 'DeployFixes1628625110369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonsUser" DROP CONSTRAINT "FK_edcc2d00143beacb0da1d834658"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" DROP CONSTRAINT "FK_6eba573dc3fc7717ca30dd15f64"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" ADD CONSTRAINT "FK_edcc2d00143beacb0da1d834658" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" ADD CONSTRAINT "FK_6eba573dc3fc7717ca30dd15f64" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonsUser" DROP CONSTRAINT "FK_6eba573dc3fc7717ca30dd15f64"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" DROP CONSTRAINT "FK_edcc2d00143beacb0da1d834658"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" ADD CONSTRAINT "FK_6eba573dc3fc7717ca30dd15f64" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" ADD CONSTRAINT "FK_edcc2d00143beacb0da1d834658" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
