/**
 * Copyright (c) 2019 Stephan Giles
 *
 * This code is licensed under MIT license.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {Component} from '@angular/core';
import {UniversityService} from '../../services/university.service';

/**
 * The component to manage Universities
 *
 * This component provides the ability for a user to manage universities.
 */
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent {
  private title = 'University Domains and Names';
  private gridApi;
  private gridColumnApi;
  private rowData: any;
  private defaultColDef;
  private rowSelection;

  /* tslint:disable */
  columnDefs = [
    {headerName: 'Name', width: 400, field: 'name', sortable: true, filter: true},
    {headerName: 'Country', width: 150, field: 'country', sortable: true, filter: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua & Deps', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Rep', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Congo {Democratic Rep}', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland {Republic}', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea North', 'Korea South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', '{Burma}', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'St Kitts & Nevis', 'St Lucia', 'Saint Vincent & the Grenadines', 'Samoa', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe']
      }
    },
    {headerName: 'Code', width: 100, field: 'alpha_two_code', sortable: true, filter: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        innerRenderer: function(params) {
          var flag =
            '<img border="0" width="15" height="10" src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/flags/' +
            params.value.toLowerCase() + '.png">';
          return '<span style="cursor: default;">' + flag + " " + params.value + "</span>";
        }
      }
    },
    {headerName: 'Province', width: 100, field: 'state-province', sortable: true, filter: true},
    {headerName: 'Domains', width: 200, field: 'domains', sortable: true, filter: true, cellEditor: "agLargeTextCellEditor"},
    {headerName: 'Web Pages', width: 200, field: 'web_pages', sortable: true, filter: true, cellEditor: "agLargeTextCellEditor"}
  ];
  /* tslint:enable */

  /**
   * Constructor
   *
   * @param universityService Service for retrieving universities
   */
  constructor(private universityService: UniversityService) {

    this.defaultColDef = {
      editable: true,
      resizable: true
    };

    this.rowSelection = 'multiple';

    this.universityService.getUniversities('', '')
      .subscribe(universities => {
        this.rowData = universities;
      });
  }

  public onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({ remove: selectedData });
  }

  public onAddRow() {
    const newItem = createNewRowData();
    this.gridApi.updateRowData({ add: [newItem] });
  }

  /**
   * Configure properties the grid after initialization
   *
   * @params params Methods of the grid
   */
  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}

/**
 * Creates a new data row with the given default data
 *
 * @returns Data to add to the row
 */
function createNewRowData(): any {
  const newData = {
    name: '',
    alpha_two_code: '',
    country: '',
    domains: '',
    web_pages: ''
  };
  return newData;
}
