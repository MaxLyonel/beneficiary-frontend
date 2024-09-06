import { afterEach, describe, expect, test, beforeAll, afterAll, vi, beforeEach } from "vitest"
// Metodos de prueba de react
import { cleanup, render, screen, waitFor } from "@testing-library/react"

import { http, HttpResponse } from "msw"
import {setupServer} from 'msw/node'
// El componente a probar
import Page from "./page"
import userEvent from '@testing-library/user-event';


const textColumns = [
   'PRIMER NOMBRE',
   'SEGUNDO NOMBRE',
   'APELLIDO PATERNO',
   'APELLIDO MATERNO',
   'CARNET IDENTIDAD',
   'PARENTESCO',
   'ACCION'
]

const server = setupServer(
   http.get(/\/api\/persons/, () => {
      // console.log("MSW interceptó la solicitud a /api/persons");
      return HttpResponse.json(
         [
            {
               id: 14,
               first_name: "Johni",
               second_name: "algo",
               last_name: "Mamani",
               mothers_last_name: null,
               identity_card: "123456789",
               due_date: null,
               is_duedate_undefined: false,
               gender: "M",
               civil_status: "S",
               birth_date: "1989-12-31",
               death_certificate: null,
               death_certificate_number: "1234567890",
               reason_death: null,
               phone_number: 1234567890,
               nua: null,
               account_number: null,
               sigep_status: null,
               id_person_senasir: null,
               date_last_contribution: null
            },
            {
               id: 15,
               first_name: "John",
               second_name: "otro algo",
               last_name: "Lopes",
               mothers_last_name: null,
               identity_card: "1234567892",
               due_date: null,
               is_duedate_undefined: false,
               gender: "M",
               civil_status: "S",
               birth_date: "1989-12-31",
               death_certificate: null,
               death_certificate_number: "1234567890",
               reason_death: null,
               phone_number: 1234567890,
               nua: null,
               account_number: null,
               sigep_status: null,
               id_person_senasir: null,
               date_last_contribution: null
            },
         ]
      )
   }),
)

beforeAll(() => server.listen())
afterEach(() => {
   server.resetHandlers()
   server.resetHandlers()
   cleanup()
})
afterAll(() => server.close())

describe.only('Page beneficiaries', () => {
   afterEach(cleanup)
   describe('Render component Table beneficiaries', () => {
      test("Checking render table", () => {
         render(<Page />)
         const table = screen.getByTestId('beneficiaries-table')
         expect(table).toBeDefined()
      })
      test("Checking number of columns", () => {
         render(<Page />)
         const columns = screen.getAllByRole("columnheader")
         expect(columns).toHaveLength(textColumns.length)
      })
      test("Should show these columns", () => {
         render(<Page />)
         textColumns.map((textColumn:any) => {
            const text = screen.getByText(textColumn)
         })
      })
      test("Checking if there is data", () => {
         render(<Page />)
         const rows = screen.getAllByRole("gridcell")
         expect(rows.length+1).toBeGreaterThanOrEqual(1)
      })
   })
   describe('Test table functionality', () => {
      test('Should get data', async () => {
         const { debug } =render(<Page />)
         // Espera hasta que el componente haya terminado de cargar los datos
         await waitFor(() => {
            const rows = screen.getAllByRole("gridcell")
            // debug(rows)
            expect(rows.length).toBeGreaterThan(0)
         })
         const firstNameCell = await screen.findByText('Johni')
         expect(firstNameCell).toBeDefined()

         const lastNameCell = await screen.findByText('Mamani')
         expect(lastNameCell).toBeDefined()

         const identityCardCell = await screen.findByText('123456789');
         expect(identityCardCell).toBeDefined()
      })
      /* TODO */
      test('Should show person options', async () => {
         const user = userEvent.setup()
         const { debug } = render(<Page />)
         const buttonAction = await screen.findAllByTestId('show')
         expect(buttonAction[0]).toBeDefined()
         user.click(buttonAction[0])
      })
   })
   describe('Render component Search beneficiary', () => {
      test('Checking render search', () => {
         render(<Page />)
         const input = screen.getAllByPlaceholderText("Buscar por...")
         expect(input).toBeDefined()
      })
   })
   describe('Render component pagination', () => {
      test('Checking render pagination', () => {
         render(<Page />)
         const pagination = screen.getByTestId("pagination")
         expect(pagination).toBeDefined()
      })
   })
})