import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.1
 * @status alpha
 */

@Component({
    tag: 'sl-table',
    styleUrl: 'table.scss',
    shadow: true
})
export class Table {
    @Prop() rowData: string[][] ;
    @Prop() columns: string[];

    componentWillLoad() {
        console.log(this.rowData);
        console.log(this.columns);
        this.rowData = [
            [
                'Hello world',
                'Something else',
                'even more stuff'
            ]
        ];

        this.columns = ['one', 'two', 'three'];
    }

    render() {
        return (
            <table>
                <tr>
                {
                    this.columns.map((title)=>{
                        return (
                            <th>{title}</th>
                        )
                    })
                }
                </tr>
                {this.rowData.map((row)=>{
                    return (
                        <tr>
                            {row.map(column => {
                                return (
                                    <td>{column}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </table>
        )
    }
}