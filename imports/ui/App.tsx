import React, { useState } from "react";
import { Home } from "./views/Home";
import { ArtistController } from "../api/artist/artist";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Dialog, TextField } from "@mui/material/";
import { toTitleCase } from "./utils";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const App = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#E9ECEF",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Music-Project
          </Typography>

          <Button variant="contained" onClick={handleShow}>
            Add A New Artist
          </Button>
        </Toolbar>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const name = formJson.name;

              console.log(name);
              const form = event.currentTarget;
              if (form.checkValidity() === true) {
                ArtistController.createArtist.call({
                  name: toTitleCase(name.trim()),
                });
              }
              handleClose();
            },
          }}
        >
          <DialogTitle>Add a new artist</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              label="Name"
              name="name"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
      <Home />
    </>
  );
};
