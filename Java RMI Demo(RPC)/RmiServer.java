/*-------
We will not be going in depth of this program, because it uses a lot of advance concepts of java.
Just added this to demonstrate, how the method which is present on server gets invoked from client.
--------*/

import java.rmi.*;
import java.rmi.server.*;
import java.rmi.registry.*;

public class RmiServer extends UnicastRemoteObject implements RmiServerIntf {
    public static final String MESSAGE = "Hello from Server";

    public RmiServer() throws RemoteException {
        super(0); // required to avoid the 'rmic' step, see below
    }

    public String getMessage() {
        return MESSAGE;
    }

    public static void main(String args[]) throws Exception {
        System.out.println("RMI server started");
        try {
            LocateRegistry.createRegistry(1099);
            System.out.println("java RMI registry created.");
        } catch (RemoteException e) {
            e.printStackTrace();
        }

        // Instantiate RmiServer
        RmiServer server = new RmiServer();

        // Bind this object instance to the name "RmiServer"
        Naming.rebind("//localhost/RmiServer", server);
        System.out.println("PeerServer bound in registry");
    }
}
