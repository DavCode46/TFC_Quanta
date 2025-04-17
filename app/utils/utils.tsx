import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const determineTransactionIcon = (type: string) => {
  switch (type) {
    case 'ingreso':
      return <Ionicons name='add' size={20} color='black' />;
    case 'transferencia':
      return <MaterialIcons name='swap-horiz' size={20} color='black' />;
    case 'retirada':
      return <Ionicons name='remove' size={20} color='black' />;
    default:
      return null;
  }
}

export { determineTransactionIcon, formatDate };

