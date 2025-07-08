import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'

// Importar todos los componentes de Quasar
import * as components from 'quasar'

// Importar plugins de Quasar
import { Notify } from 'quasar'

// Importar SweetAlert2
import Swal from 'sweetalert2'

export default {
  config: {}, // Config global opcional
  plugins: {
    Notify
  }, // Plugins de Quasar
  components: components,
}
