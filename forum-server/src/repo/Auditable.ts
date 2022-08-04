import { BaseEntity, Column } from "typeorm";

export class Auditable extends BaseEntity{
    @Column("varchar",{
        name:"CreatedBy",
        length: 60,
        default: () =>`getpgusername()`,
        nullable: false
    })
    createdBy: string;

    @Column("timestamp with time zone",{
        name: "createdOn",
        default: () => `now()`,
        nullable:false
    })
    createdOnd: Date;

    @Column("varchar",{
        name:"lastModifiedBy",
        length: 60,
        default: () =>`getpgusername()`,
        nullable: false
    })
    lastModifiedBy: string;

    @Column("timestamp with time zone",{
        name: "lastModifiedOn",
        default: () => `now()`,
        nullable:false
    })
    lastModifiedOn: Date;

}